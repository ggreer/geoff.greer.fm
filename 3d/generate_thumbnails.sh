#!/bin/bash

set -e

image_size="800,600"

file_paths=$(find . -name '*.scad')

for file_path in $file_paths
do
  dir_name=$(dirname "$file_path")
  base_name=$(basename -s .scad "$file_path")
  echo "Generating preview images for $file_path"
  base_path="${dir_name}/${base_name}"

  # render multiple angles
  # standard view
  openscad --render --imgsize="$image_size" --viewall --autocenter --view=axes,scales --camera=0,0,0,55,0,25,0 -o "${base_path}-0.png" "$file_path" &
  # rotate 90 degrees
  openscad --render --imgsize="$image_size" --viewall --autocenter --view=axes,scales --camera=0,0,0,55,0,115,0 -o "${base_path}-1.png" "$file_path" &
  # rotate 180 degrees
  openscad --render --imgsize="$image_size" --viewall --autocenter --view=axes,scales --camera=0,0,0,55,0,205,0 -o "${base_path}-2.png" "$file_path" &
  # top
  openscad --render --imgsize="$image_size" --viewall --autocenter --view=axes,scales --projection=ortho --camera=0,0,0,0,0,0,0 -o "${base_path}-top.png" "$file_path" &
  # side
  openscad --render --imgsize="$image_size" --viewall --autocenter --view=axes,scales --projection=ortho --camera=0,0,0,90,0,0,0 -o "${base_path}-side.png" "$file_path" &
  # front
  openscad --render --imgsize="$image_size" --viewall --autocenter --view=axes,scales --projection=ortho --camera=0,0,0,90,0,270,0 -o "${base_path}-front.png" "$file_path"
  # back
  # openscad --render --imgsize="$image_size" --viewall --autocenter --view=axes,scales --projection=ortho --camera=0,0,0,90,0,90,0 -o "${base_path}-back.png" "$file_path"
done
