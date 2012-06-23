#/usr/bin/env ruby

require 'open-uri'

shoot_uri = "http://www.classicalcode.com/shoot.png/"

angles=[75, 77]
powers=[150, 140, 130, 125, 120, 110, 100]

for i in 1..100000 do
  win = false
  broken = false

  for angle in angles do
    for power in powers do
      if angle <= 75 && power > 130
        next
      end
      if angle >= 75 && power < 100
        next
      end

      angle_time = (angle.to_f / 90.0) * 10.0 - 0.2
      power_time = (power.to_f - 40.0) / 15.0 - 0.2

      puts "Starting shot. Angle: #{angle} Power: #{power}"
      image_data = open(shoot_uri).read

      puts "Sleeping for #{angle_time}"

      sleep angle_time
      image_data = open(shoot_uri).read

      puts "Sleeping for #{power_time}"

      sleep power_time
      image_data = open(shoot_uri).read

      puts "Image size: #{image_data.length}"
      if image_data.length > 5000
        puts "WIN!"
        #do stupid fetch again
        image_fd = File.new("img.png", "w")
        image_fd.puts(image_data)
        image_fd.close
        image_data = open(shoot_uri).read
        win = true
        sleep 10
        break
      else
        puts "Missed"
      end

      image_fd = File.new("img.png", "w")
      image_fd.puts(image_data)
      image_fd.close
    end
    if win == true || broken == true
      puts "breaking"
      break
    end
  end

  if win == false
    puts "sleeping 11"
    sleep 11
  end
end