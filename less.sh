#!/bin/bash

for less_file in styles/*.less
do
  css_file=`echo $less_file | sed -E "s/.less//"`
  echo "lessc $less_file $css_file.css"
  lessc $less_file $css_file.css
done
