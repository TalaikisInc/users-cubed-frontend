#!/bin/bash

APP=$1
PORT=$2

./slave_build.sh "$APP"
docker stop "$APP"
docker rm "$APP"
./slave_start.sh "$APP" "$PORT"
