#!/usr/bin/env -S pwsh-preview -noProfile -nologo

param()

$basePath = $PSScriptRoot
$zigbee2MqttREST = "${basePath}/invoke_rest.ps1"

function GetAllSinks() { return $(pactl list short sinks | cut -f 2).Trim(" `t`n`r") }
function GetDefaultSink() { return $(pactl info | grep 'Default Sink' | cut -d':' -f 2).Trim(" `t`n`r") }

$getDefaultSink = GetDefaultSink
$sinks = GetAllSinks
$newSink = $null

foreach ($item in $getDefaultSink) {
    if ([string]::IsNullOrEmpty($item)) { continue; }
    $defaultSink = $item.Trim(" `t`n`r")
}

for ($i = 0; $i -lt $sinks.Count; $i++) {
    $sink1 = $sinks[$i].Trim("`t`n`r").ToString()
    $sinkd = $defaultSink.Trim("`t`n`r").ToString()
    if ($sink1 -match $sinkd) { continue; }

    $newSink = $sink1
    break
}

pactl set-default-sink "${newSink}"

$split1 = $newSink.Split('.');
$split2 = $split1[$split1.length - 1].Split('-');

$newText = "$($split2[0])-$($split2[1])"

if ($newText -match 'analog-stereo') {
    & $zigbee2MqttREST -power "on"
} else {
    & $zigbee2MqttREST -power "off"
}

return $newText