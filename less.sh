#!/bin/bash

for less_file in styles/*.less
do
  if [[
    $less_file == "styles/colors.less" ||
    $less_file == "styles/gallery.less" ||
    $less_file == "styles/main-base.less" ]]; then
    continue
  fi
  css_file=$(echo "$less_file" | sed -E "s/.less//")
  echo "lessc $less_file $css_file.css"
  lessc -x "$less_file" "$css_file.css"
done
