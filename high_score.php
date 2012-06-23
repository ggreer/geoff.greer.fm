#!/usr/bin/env php

<html>
<head>
  <title>High Scores</title>
</head>
<body>

<?php
$seconds = $_GET["seconds"];
$name = $_GET["name"];

if(!$name) {
  $name = "Geoff";
}

// Connecting, selecting database
$link = mysql_connect('db.mipsisrisc.com', 'zero_g', 'icadil18')
    or die('Could not connect: ' . mysql_error());
mysql_select_db('zero_g') or die('Could not select database');

//TODO: SANITIZE INPUT
if($seconds && $name) {
  $query = 'INSERT INTO scores (name, score) VALUES ("'.$name.'", '.$seconds.')';
  $result = mysql_query($query) or die('Query failed: ' . mysql_error());
}

$query = 'SELECT name, score FROM scores ORDER BY score DESC LIMIT 10';
$result = mysql_query($query) or die('Query failed: ' . mysql_error());

// Printing results in HTML
?>

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Score</th>
    </tr>
  </thead>
  <tbody>
<?
while ($line = mysql_fetch_array($result, MYSQL_NUM)) {
    echo "\t<tr>\n";
    echo "\t\t<td>$line[0]</td>\n";
    echo "\t\t<td>$line[1] seconds</td>\n";
    echo "\t</tr>\n";
}
?>
  </tbody>
</table>
<?
// Free resultset
mysql_free_result($result);

// Closing connection
mysql_close($link);
?>

</body>
</html>
