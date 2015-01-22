<?php 

$conn = mysqli_connect('localhost', 'root', '', 'portal') or die("Error " .  mysqli_error($conn));
$query="SELECT DISTICT c.aci_name FROM address_city c order by 1";
$result = $mysqli->query($query) or die($mysqli->error.__LINE__);

$arr = array();
if($result->num_rows > 0) {
	while($row = $result->fetch_assoc()) {
		$arr[] = $row;	
	}
}


# JSON-encode the response
echo $json_response = json_encode($arr);
?>