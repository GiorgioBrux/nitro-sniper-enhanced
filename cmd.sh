#!/bin/bash
if [ -z "$mainToken" ]; then
  printf "Error: mainToken is empty. Quitting..."
  exit 0
elif [ -z "$guildTokens" ]; then
  if [ "$useMain" = true ]; then
    printf "Info: running only on mainToken because guildTokens is empty."
  else
    printf "Error: guildTokens is empty and useMain is set to false/undefined. Set it to true or add slave tokens. Quitting..."
    exit 0
  fi
fi

if [ -z "$useMain" ]; then
  printf "Info: useMain is not set. Defaulting to false..."
  useMain="false"
fi

node .