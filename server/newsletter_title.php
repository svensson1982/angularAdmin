<?php

$conn = mysqli_connect('localhost', 'root', '', 'portal') or die("Error " .  mysqli_error($conn));
$conn->set_charset("utf8");
$query = "SELECT * FROM portal.newsletter WHERE nl_id BETWEEN 12320 AND 12327"
        or die("Error in the " . mysqli_error($conn));
$res = $conn->query($query);
$json = array();
$json['title'] = "";
$json['id'] = "";

while($row = mysqli_fetch_assoc($res)){
    $json['title'][] .= $row['nl_title'];
    $json['id'][] .= $row['nl_id'];    
}

echo json_encode($json, JSON_FORCE_OBJECT);