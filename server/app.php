<?php

$conn = mysqli_connect('localhost', 'root', '', 'portal') or die("Error " .  mysqli_error($conn));
$conn->set_charset("utf8");
$query = "SELECT * FROM portal.offer" or die("Error in the " . mysqli_error($conn));
$res = $conn->query($query);

echo '<table class="table table-striped table-bordered">
<tr><th>#</th><th>Offet Title</th><th>Offer Name</th><th>Offer Price</th></tr>';

while($row = mysqli_fetch_assoc($res)){
    echo "<tr><td>".$row['offer_id'] ."</td><td>".$row['offer_title'] ."</td><td>".  $row['offer_name'] ."</td><td>".  $row['offer_price'] . "</td></tr>";
}
echo '</table>';