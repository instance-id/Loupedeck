#!/usr/bin/env -S pwsh-preview -noProfile -nologo

param()

$basePath = $PSScriptRoot
$zigbee2MqttREST = "${basePath}/invoke_rest.ps1"

return & $zigbee2MqttREST -endpoint wax_heater -power 'toggle'
