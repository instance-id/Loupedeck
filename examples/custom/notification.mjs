#!/usr/bin/env node

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

import fsPromises from "node:fs/promises";
import fs from 'node:fs';
import path from 'path';
import JSON5 from 'json5';

var colorLerp = require('color-lerp');

let notification;
let previousMTime = new Date(0)
let __dirname = path.resolve()

// --| Sleep for duration -----------------------
function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

async function readNotification(dev) {
    var notifyData = await fsPromises.readFile(notification);
    var notifyJson = JSON5.parse(notifyData);
    handleNotification({ message: notifyJson.text, duration: notifyJson.duration, device: dev });
}

// --| Read Notification ------------------------
export async function handleNotification({ message, duration, color1, color2, device }) {
    let start_color = color1 ? color1 : "hsl(0, 100%, 50%)";
    let end_color = color2 ? color2 : "hsl(317, 100%, 50%)";
    let duration_value = duration ? duration : 4;

    console.log(`Notification: ${message}`)

    try {
        // await device.showOverlayText(duration_value, message)

        var lerp_start = colorLerp(start_color, end_color, 50, 'rgb');
        var lerp_end = colorLerp(end_color, start_color, 50, 'rgb');

        var total = 49;
        var time = 0;
        var time2 = 0;
        var lastValue;

        // var interval = setInterval(async () => {
        //     time++;
        //     if (time > total) {
        //         clearInterval(interval);
        //         return;
        //     }
        //     var value = lerp_start[time];
        //     var color = value.replace(/[^0-9,.]/g, '').split(',').map(Number);

        //     if (lastValue !== value) {
        //         await device.setWheelColor(color[0], color[1], color[2]);
        //         lastValue = value;
        //     }
        // }, 100);


        // --| Testing color change sequences ---
        await sleep(50 * 51).then(async () => {
            return;

            var interval2 = setInterval(async () => {
                time2++;
                if (time > total) {
                    clearInterval(interval2);
                    return;
                }
                var value = lerp_end[time2];
                var color = value.replace(/[^0-9,.]/g, '').split(',').map(Number);

                if (lastValue !== value) {
                    await device.setWheelColor(color[0], color[1], color[2]);
                    lastValue = value;
                }
            }, 50);
        });
    }
    catch (err) { console.log(err); }
}

// --| Start Watcher ----------------------------
export function startWatcher(notification_file, device) {
    let notifPath = path.join(__dirname, notification_file);
    notification = notifPath;
    let dev = device;

    try {
        if (fs.existsSync(notifPath)) {
            // --| Watch for changes to notification file
            fs.watch(notifPath, async (_event, filename) => {
                if (filename) {
                    const stats = fs.statSync(filename);
                    if (stats.mtime.valueOf() === previousMTime.valueOf()) {
                        return;
                    }

                    previousMTime = stats.mtime;
                    readNotification(dev);
                }
            });
        }
        else {
            console.log(`Could not locate ${notifPath}`);
        }
    }
    catch (err) {
        console.error(err)
    }
}
export default { handleNotification, startWatcher }