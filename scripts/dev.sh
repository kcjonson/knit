#!/bin/sh

tmux kill-session -t knit-dev
tmux new-session -s "knit-dev" -d
tmux set remain-on-exit on
tmux split-window -h 'ping -c 3 127.0.0.1'
tmux split-window -h
tmux select-layout even-horizontal
tmux -2 attach-session -d
