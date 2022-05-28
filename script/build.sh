#!/bin/bash

base_file_path="src/server/api/BASE.ts"
ws_file_path="src/server/ws.ts"

# 1. BASE.ts
read -p "输入BASE_URL值: " BASE_URL
get_BASE_URL=`cat $base_file_path | grep "const" | cut -d "=" -f 2`
sed -i "s#$get_BASE_URL#'$BASE_URL'#g" $base_file_path 
echo BASE_URL OK...

# 2. ws.ts
read -p "输入BASE_WS_URL 的IP: " WS_IP
read -p "输入BASE_WS_URL 的PORT: " WS_PORT
get_WS=`cat $ws_file_path| grep const | grep -Po '(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d).(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d).(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d).(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d):(6553[0-5]|655[0-2]\d|65[0-4]\d{2}|6[0-4]\d{3}|[0-5]\d{4}|[1-9]\d{0,3})'`
get_WS_IP=`echo $get_WS| cut -d ":" -f 1` 
get_WS_PORT=`echo $get_WS| cut -d ":" -f 2` 
sed -i "s#$get_WS_IP#$WS_IP#g" $ws_file_path 
sed -i "s#$get_WS_PORT#$WS_PORT#g" $ws_file_path 
echo WS OK...

# 3.highlightjs