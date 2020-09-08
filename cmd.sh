#!/bin/bash
if [ -z "$mainToken" ] || [ -z "$guildTokens" ]; then
  printf "The following variables are missing:\n";
  if [ -z "$mainToken" ]; then
    printf "+ mainToken\n";
  fi
  if [ -z "$guildTokens" ]; then
    printf "+ guildTokens\n";
  fi
  if [ -z "$useMain" ]; then
    printf "Additionally, useMain is not set which will default it to false.\n";
  fi
  printf "\nPlease set the required variables. Quitting...";
  exit 0
fi

if [ -z "$useMain" ]; then
  printf "useMain is not set. Defaulting to false...";
fi

node .