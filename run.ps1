#!/usr/bin/env -S pwsh-preview -noProfile -nologo

[Diagnostics.CodeAnalysis.SuppressMessageAttribute('PSAvoidUsingCmdletAliases', '')]

param()
  $log = "${HOME}/loupedeck_runner.log"
  
  $tmuxSession = & tmux ls 2>/dev/null | grep -i -q "loupedeck" && echo $?
  $currentPath = $PSScriptRoot
  push-location $currentPath

  try {
    if ($null -ne $tmuxSession){
      & tmux kill-server
      echo 'Killed server'

      $command = 'node ./examples/custom/index.mjs'
      $tmuxSession = & tmux new-session -d -s "loupedeck" $command 
      bash -c "$tmuxSession 2>&1>$log"
      sleep 2

      & tmux kill-server
      sleep 2
    }

    $command = 'node ./examples/custom/index.mjs';
    $tmuxSession = & tmux new-session -d -s "loupedeck" $command 

    bash -c "$tmuxSession 2>&1>$log"
    echo "Started Loupedeck"

  } catch {
    echo $_
  }
finally {
  pop-location
}
