#!/bin/bash

set -ex

image_size="800,600"

file_paths=$(find . -name '*.stl')

regenerate_all=true


function render {
  projection="$1"
  camera="$2"
  image_path="$3"
  scad_path="$4"

  if [ -f "$image_path" ] && [ -z "$regenerate_all" ]; then
    echo "$image_path already exists. Skipping"
    return;
  fi
  openscad --render --imgsize="$image_size" --viewall --autocenter --view=axes,scales --projection="$projection" --camera="$camera" -o "$image_path" "$scad_path"
}

function render_all {
  base_path="$1"
  scad_path="$2"

  # render multiple angles
  # standard view
  render perspective "0,0,0,55,0,25,0" "${base_path}-0.png" "$scad_path" &
  # rotate 90 degrees
  render perspective "0,0,0,55,0,115,0" "${base_path}-1.png" "$scad_path" &
  # rotate 180 degrees
  render perspective "0,0,0,55,0,205,0" "${base_path}-2.png" "$scad_path" &
  # top
  render ortho "0,0,0,0,0,0,0" "${base_path}-top.png" "$scad_path" &
  # side
  render ortho "0,0,0,90,0,0,0" "${base_path}-side.png" "$scad_path" &
  # front
  render ortho "0,0,0,90,0,270,0" "${base_path}-front.png" "$scad_path"
  # back
  # openscad --render --imgsize="$image_size" --viewall --autocenter --view=axes,scales --projection=ortho --camera=0,0,0,90,0,90,0 -o "${base_path}-back.png" "$file_path"
}


for file_path in $file_paths
do
  dir_name=$(dirname "$file_path")
  base_name=$(basename -s .stl "$file_path")
  echo "Generating preview images for $file_path"
  base_path="${dir_name}/${base_name}"

  tmp_scad="tmp_${base_name}.scad" # TODO: this can conflict if stl files in different dirs have the same name
  echo "import(\"${file_path}\");" > "${tmp_scad}"
  render_all "$base_path" "$tmp_scad"

  rm "${tmp_scad}"
done



file_paths=$(find . -name '*.scad')

for file_path in $file_paths
do
  dir_name=$(dirname "$file_path")
  base_name=$(basename -s .scad "$file_path")
  echo "Generating preview images for $file_path"
  base_path="${dir_name}/${base_name}"

  render_all "$base_path" "$file_path"
done
