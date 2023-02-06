#!/usr/bin/bash

# Start from bash

log="${HOME}/loupedeck_runner.log"
tmuxSession=$(tmux list-sessions 2>/dev/null | grep "loupedeck")

if [ ! -z "${tmuxSession}" ]
then
  tmux kill-session -t "loupedeck"
  echo 'Killed loupedeck tmux'
  sleep 2
fi
tmux new-session -d -s "loupedeck" "node ./examples/custom/index.mjs 2>&1 | tee $log"

echo "Started Loupedeck tmux"
tmux ls
echo "---- Connect to it with: tmux attach-session -t loupedeck"
exit 0