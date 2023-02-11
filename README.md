## Loupedeck multipurpose command runner setup for linux.

## Note: Active work in progress.  
### I made this for my personal use, so things are the way they are because of reasons

---
I primarily transfered over the logic I had written for my [Xcencelabs QuickKeys](https://github.com/instance-id/quick-keys-app) to the Loupedeck.

#### Features
* Script Running  
* Volume Adjustment
* MQTT message sending and receiving  
* Others I am not thinking of at the moment  

#### Note
It may be a bit diffifcult to figure out at first, but this includes an MQTT client in which I connect to my HomeAssistant instance and began adding two way communication to trigger sensor behavior, and subscribe/listen for events, then run local scripts based on message payload.

<img src="docs/loupedeck_linux.jpg"  width="500" >


#### Dependencies
---
 Make sure you have the following installed in your system:

* node
* bash
* tmux
* npm

To install node dependencies run this from the project root folder

`$ npm install`

#### Configure

---

Edit the config/config.toml file to setup your Loupedeck



A .env file in your project root containing your MQTT settings (if applicable) or an empty file  

`$ touch .env`

Edit the .env file to set some settings



#### Start
---

If you use powershell run

`$ ./run.ps1`

If you use bash run

`$ ./run.sh`

This will spawn off an node instance handeling the Loupedeck in the background
you can check the logs with the tmux command

`$ tmux attach-session -t loupedeck`

You can also just start it with the node commant directly using

`$ node ./examples/custom/index.mjs`

This could be usefull for development.


### Tips & Tricks for the config

---

#### xdotool

If you use X11 you can use xdotool to trigger special keys, there probabably exist something equal that can used for Wayland.

For example you can use something like:

```
command = "xdotool key XF86AudioLowerVolume"
```

To control the volume, this will in some systems like Ubunto be picked up and a smal screen overlay will be displayed. 

xdotool can also send commands to specific application, for example to toggle the mic in the system and in zoom with the same command you could use:

```
command = "xdotool key XF86AudioMicMute ; xdotool search --desktop 0 --class Zoom windowactivate key Alt+a ; echo ToggleMic"
```

Here is a setup example setting up the lower knob on Loupedeck Live S to control the mic input volume that toggle mute of it (and in zoom app) when pressed:

```
[wheel.knobCL.left]
cmd_type = "shell"
command = "amixer set Capture 5%- > /dev/null 2>&1 && results=$(amixer sget Capture | awk -F\"[][]\" '/Left:/ { print $2 }'); echo $results"

[wheel.knobCL.right]
cmd_type = "shell"
command = "amixer set Capture 5%+ > /dev/null 2>&1 && results=$(amixer sget Capture | awk -F\"[][]\" '/Left:/ { print $2 }'); echo $results"

[button.knobCL]
cmd_type = "shell"
command = "xdotool key XF86AudioMicMute ; xdotool search --desktop 0 --class Zoom windowactivate key Alt+a ; echo ToggleMic"
```

---
See the below repo that the base library is capable of.  
Powered by Loupedeck Node library
Unofficial Node.js API for [Loupedeck Live](https://loupedeck.com/products/loupedeck-live/) & [Loupedeck Live S](https://loupedeck.com/products/loupedeck-live-s/) controllers.