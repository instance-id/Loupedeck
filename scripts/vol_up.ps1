#!/usr/bin/env -S pwsh-preview -noProfile -nologo

$sinks = $(pactl list short sinks | cut -f 2) 
$output = $sinks | where  {$_ -match 'hdmi-stereo'}

pactl set-sink-volume $output +2% > /dev/null 2>&1

$vol = bash -c "pactl list sinks | grep '^[[:space:]]Volume:' | head -n $(( $SINK + 1 )) | tail -n 1 | sed -e 's,.* \([0-9][0-9]*\)%.*,\1,'"
return $vol