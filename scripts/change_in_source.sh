#!/bin/bash

CUR_DEFAULT="$(pactl info | grep 'Default Source' | cut -d':' -f 2)"
SOURCES="$(pactl list short sources | cut -d'	' -f 2)"

[ -n "$1" ] && [ "$1" = "-g" ] && echo "$CUR_DEFAULT" && exit

NEXT=0

for S in $SOURCES ; do
  # Store the first value for later, in case of the special case happening, where the current default is the last one.
  # AFAIK one can't always assume it's 0
  [ -z "$FIRST_SOURCE" ] && FIRST_SOURCE=$S

  # If the loop doesn't end we reach this step, get the number of the next source and set it to default
  [ $NEXT -eq 1 ] && NEW_DEFAULT_SOURCE=$S && break
  #echo "NDS: $NEW_DEFAULT_SOURCE"

  # If the current value is the default, the next one should be the new one. Flag that - AFTER the check
  # Either The space before $S has to be there, or I need to trim it in CUR_DEFAULT, fx. with | xargs. I figure this is clearly better computationally
  [ " $S" = "$CUR_DEFAULT" ] && NEXT=1
done

[ -z "$NEW_DEFAULT_SOURCE" ] && NEW_DEFAULT_SOURCE=$FIRST_SOURCE

# Set default sink for new audio recordings
pactl set-default-source "$NEW_DEFAULT_SOURCE"