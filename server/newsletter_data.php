<?php
$id = $_POST['get_id'];

$conn = mysqli_connect('localhost', 'root', '', 'portal') or die("Error " .  mysqli_error($conn));
$conn->set_charset("utf8");
$query = "SELECT * FROM portal.newsletter WHERE nl_id = ".$id.";"
        or die("Error in the " . mysqli_error($conn));
$res = $conn->query($query);
$json = array();
$json['table_content'] = "";
$iter = 0;

$json['table_begin'] = '<table class="table table-striped table-bordered">
<tr><th>#</th><th>Newsletter Title</th><th>Newsletter subject</th><th>Newsletter Content</th></tr>';

while($row = mysqli_fetch_assoc($res)){
    
    $json['table_content'][] .= "<tr><td>".$row['nl_id'] ."</td><td>".$row['nl_title'] ."</td><td>".$row['nl_subject'] ."</td></tr>";
    
}
$json['table_end'] = '</table>';

echo json_encode($json, JSON_FORCE_OBJECT);