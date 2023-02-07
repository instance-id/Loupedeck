#!/usr/bin/env node

import * as mqtt from "mqtt"  // import everything inside the mqtt module and give it the namespace "mqtt"
import JSON5 from 'json5';

let client; // create a client

const PORT = 1883

let options = {
    port: PORT,
    host: 'localhost',
    username: 'mqtt',
    password: 'mqtt',
    keepalive: 10000,
    protocol: 'mqtt'
}

export function MqttSetup(conf) {
    if (conf.mqtt.enabled == 1 ) {
        try {
            options.host = conf.mqtt.host;
            options.port = conf.mqtt.port;
            options.username = conf.mqtt.username;
            options.password = conf.mqtt.password;
            options.keepalive = conf.mqtt.keepalive

            client = mqtt.connect(options.host, options)
            client.once('connection', (stream) => {
                console.log(`connected: ${client.connected}`);
            });

            let msgOptions = { retain: true }

            client.publish('loupedeck/incoming', '{"message":"Connection Successful"}', msgOptions, console.log)
            client.publish('loupedeck/outgoing', '{"message":"Connection Successful"}', msgOptions, console.log)
            client.subscribe('loupedeck/incoming/#')
        } catch (error) {
            console.log(`Mqtt connection error: ${error.message}`)
            client.end();
        }
        return client;
    }
    else {
        console.log(`Mqtt connection disabled in config`)
        return undefined;
    }
}

export default { MqttSetup }

