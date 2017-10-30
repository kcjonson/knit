#!/bin/sh

COMMAND=$1
PACKAGE=$2
SCRIPT_DIR="$( cd "$( dirname "$0" )" && pwd )"

# tmux kill-session -t knit
# tmux new-session -s "knit" -d
# tmux set remain-on-exit on
# tmux split-window -h 'ping -c 3 127.0.0.1'
# tmux split-window -h
# tmux select-layout even-horizontal
# tmux -2 attach-session -d



function RUN_IN_PACKAGE {
  cd $SCRIPT_DIR/../packages/$2
  npm run $1
  cd $SCRIPT_DIR
}

case $COMMAND in
  build)
    if [ -z ${2+x} ]; then
      RUN_IN_PACKAGE build client
      RUN_IN_PACKAGE build server-api
      RUN_IN_PACKAGE build server-web
    else
      RUN_IN_PACKAGE build $2
    fi
  ;;
  start)
    if [ -z ${2+x} ]; then
      echo "Cannot start all"
      exit 1;
    else
      RUN_IN_PACKAGE start $2
    fi
  ;;
  watch)
    if [ -z ${2+x} ]; then
      echo "Cannot watch all"
      exit 1;
    else
      RUN_IN_PACKAGE watch $2
    fi
  ;;
  dev)
    if [ -z ${2+x} ]; then

      # do the initial build
      ./index.sh build client
      ./index.sh build server-web
      ./index.sh build server-api

      # start servers and watchers
      tmux kill-session -t knit-dev
      tmux set remain-on-exit on
      tmux new-session -s "knit-dev" -d './index.sh watch client; read'
      tmux split-window -h './index.sh watch server-web; read'
      tmux split-window -h './index.sh watch server-api; read'
      tmux select-layout even-horizontal
      tmux split-window -vf './index.sh start server-api; read'
      tmux split-window -h  './index.sh start server-web; read'
      tmux -2 attach-session -d
    else
      RUN_IN_PACKAGE $2 dev
    fi
  ;;
  *)
    echo $"Usage: $0 {build|start|watch|dev}"
    exit 1
  ;;
esac
