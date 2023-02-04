## SLoupedeck multipurpose command runner setup for linux.

I primarily transfered over the logic I had written for my [Xcencelabs QuickKeys](https://github.com/instance-id/quick-keys-app) to the Loupedeck.

#### Features
Script Running 
Volume Adjustment
MQTT message sending and receiving
Others I am not thinking of at the moment

#### Note
It may be a bit diffifcult to figure out at first, but this includes an MQTT client in which I connect to my HomeAssistant instance and began adding two way communication to trigger sensor behavior, and subscribe/listen for events, then run local scripts based on message payload.

<img src="docs/loupedeck_linux.jpg"  width="500" >

---
See the below repo that the base library is capable of.  
Powered by Loupedeck Node library
Unofficial Node.js API for [Loupedeck Live](https://loupedeck.com/products/loupedeck-live/) & [Loupedeck Live S](https://loupedeck.com/products/loupedeck-live-s/) controllers.
