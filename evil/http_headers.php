<?php
header('Content-type: text/html');
foreach($_SERVER as $h=>$v) 
{
  if(ereg('HTTP_(.+)',$h,$hp))
  {
    echo "<li>$h = $v</li>\n";
  }
}
?>

