#!/usr/bin/env node

// --| Import Setup -------------------
// --| --------------------------------
import { exit } from "node:process";
import fsPromises from "node:fs/promises";
import * as dotenv from 'dotenv'

import toml from 'toml';
import path from 'path';
let __dirname = path.resolve();

let config;
let data;
const p = path.join(__dirname, "config/config.toml");

// --| Load and parse the config file -----------
export async function readConfig() {
    try {
        console.log(`Config Path: ${p}`);
        data = await fsPromises.readFile(p);
        config = toml.parse(data);

        if (config.mqtt.enabled == 1 ) {
            // --| Load .env file ---------
            const result = dotenv.config()
            if (result.error) {
                throw result.error
            }

            // --| Merge .env file --------
            config.mqtt = { ...config.mqtt, ...result.parsed }
        }
        console.log(config)
    }
    catch (err) { console.log("Could not load config file", err); exit(1); }

    console.log("Config Loaded");
    return config;
}

export default { readConfig };