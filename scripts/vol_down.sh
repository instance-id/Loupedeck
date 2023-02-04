#!/bin/bash


SINK=$(pactl list short sinks | cut -f 2)

pactl set-sink-volume alsa_output.pci-0000_0c_00.1.hdmi-stereo-extra4 -2% > /dev/null 2>&1