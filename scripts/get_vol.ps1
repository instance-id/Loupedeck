#!/usr/bin/env -S pwsh-preview -noProfile -nologo

$vol = bash -c "pactl list sinks | grep '^[[:space:]]Volume:' | head -n $(( $SINK + 1 )) | tail -n 1 | sed -e 's,.* \([0-9][0-9]*\)%.*,\1,'"
return $vol