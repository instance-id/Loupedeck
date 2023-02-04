#!/usr/bin/env -S pwsh-preview -noProfile -nologo

[System.Diagnostics.CodeAnalysis.SuppressMessageAttribute('PSAvoidUsingCmdletAliases', '')]
[System.Diagnostics.CodeAnalysis.SuppressMessageAttribute('PSUseDeclaredVarsMoreThanAssignments', '')]

# -- line_source, wax_heater
param (
    [string]$power = 'off',
    [string]$endpoint = 'line_source'
)

$basePath = $PSScriptRoot
$config = Import-PowerShellDataFile -Path "${basePath}/config.psd1"

$body = @{ 'state' = "${power}" } | ConvertTo-Json
$header = @{'Content-Type' = 'application/json' }

[Net.ServicePointManager]::ServerCertificateValidationCallback = { $true }
$response = Invoke-RestMethod -Uri "$($config.restAddress)/${endpoint}" -Method 'Post' -Body $body -Headers $header | ConvertTo-Json
echo $response.ToString()
