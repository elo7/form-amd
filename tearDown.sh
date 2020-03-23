#!/bin/bash

ps aux | grep http-server | grep -v grep | awk '{print $2}' | xargs kill -9;
