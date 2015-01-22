<?php

$conn = mysqli_connect('localhost', 'root', '', 'portal') or die("Error " .  mysqli_error($conn));
$conn->set_charset("utf8");
$query = "SELECT * FROM portal.offer" or die("Error in the " . mysqli_error($conn));
$res = $conn->query($query);

$json = array();
$json['offer_id'] = "";        
$json['offer_title'] = "";        
$json['offer_name'] = "";        
$json['offer_price'] = "";        
        

while($row = mysqli_fetch_assoc($res)){
    
        $json['offer_id'][] .= $row['offer_id'];
        $json['offer_title'][] .= $row['offer_title'];
        $json['offer_name'][] .= $row['offer_name'];
        $json['offer_price'][] .= $row['offer_price'];
}
echo json_encode($json, JSON_FORCE_OBJECT);