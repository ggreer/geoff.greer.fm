require 'rexml/document'
require 'time'
include REXML

xml_file = File.new("2006-12-15 15;12;28.xml")
xml_doc = Document.new(xml_file)

root = xml_doc.root

# Check to make sure Nike+ XML version is correct
exit("Wrong version of Nike XML data") unless root.elements["vers"][0] == 2
puts "Nike XML version: " + root.elements["vers"][0].value

# OK, time to dump all the crazy info in this XML doc. 
# Useful code would throw this info into an object or DB.
puts "Start time: " + Time.xmlschema(root.elements["runSummary/time"][0].value).to_s #Start time of run
puts "Duration (ms): " + root.elements["runSummary/duration"][0].value #Duration in ms
puts "Distance: " + root.elements["runSummary/distance"][0].value
puts "Distance units: " + root.elements["runSummary/distance"].attributes["unit"]
puts "Playlist: " + root.elements["runSummary/playlistList/playlist/playlistName"][0].value
puts "Weight (kg): " + root.elements["userInfo/weight"][0].value
puts "Device: " + root.elements["userInfo/device"][0].value
puts "Calibration info: " + root.elements["userInfo/calibration"][0].value

puts "Snapshot Type: " + root.elements["snapShotList[@snapShotType='kmSplit']"].attributes["snapShotType"]

root.elements.each("snapShotList[@snapShotType='kmSplit']/snapShot") do |element| 
  puts "Duration: " + element.elements["duration"][0].value
  puts "Distance (km): " + element.elements["distance"][0].value
  puts "Pace: " + element.elements["pace"][0].value
end


puts "Snapshot Type: " + root.elements["snapShotList[@snapShotType='mileSplit']"].attributes["snapShotType"]

root.elements.each("snapShotList[@snapShotType='mileSplit']/snapShot") do |element| 
  puts "Duration: " + element.elements["duration"][0].value
  puts "Distance (km): " + element.elements["distance"][0].value
  puts "Pace: " + element.elements["pace"][0].value
end


puts "Snapshot Type: " + root.elements["snapShotList[@snapShotType='userClick']"].attributes["snapShotType"]

root.elements.each("snapShotList[@snapShotType='userClick']/snapShot") do |element| 
  puts "Event: " + element.attributes["event"]
  puts "Duration: " + element.elements["duration"][0].value
  puts "Distance (km): " + element.elements["distance"][0].value
  puts "Pace: " + element.elements["pace"][0].value
end


puts "Extended data type: " + root.elements["extendedDataList/extendedData"].attributes["dataType"]
puts "Interval type: " + root.elements["extendedDataList/extendedData"].attributes["intervalType"]
puts "Interval unit: " + root.elements["extendedDataList/extendedData"].attributes["intervalUnit"]
puts "Interval value: " + root.elements["extendedDataList/extendedData"].attributes["intervalValue"]
puts "Extended data: " + root.elements["extendedDataList/extendedData"][0].value
