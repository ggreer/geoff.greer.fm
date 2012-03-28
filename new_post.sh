#!/bin/sh

POST_DATE=`date +%Y-%m-%d`
POST_TIME=`date +%H:%M:%S`

# Replace spaces with dashes, convert to lower case
TITLE=`echo "$@" | sed -E 's/ /-/g' | tr '[A-Z]' '[a-z]'`

POST_DIR=./_posts

POST_FILE=$POST_DIR/$POST_DATE-$TITLE.markdown

echo $POST_FILE

if [ -e $POST_FILE ]; then
    echo $POST_FILE already exists
    exit
fi


echo "---
date: '$POST_DATE $POST_TIME'
layout: post
slug: $TITLE
status: publish
title: $@
categories:
---
" >> $POST_FILE

#create file, print utc date & local time
#open it in textmate

mate $POST_FILE
