
<?php
$host = 'localhost';
$dbname = 'guvian\'s';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    // set other PDO attributes as needed
} catch(PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}

if(isset($_POST['fname'])) {
    $fname = $_POST['fname'];
    $lname = $_POST['lname'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $passwor = $_POST['password'];
	$stmt = $pdo->prepare("INSERT INTO test_2 (fname,lname,email,password,phone) VALUES (:fname,:lname ,:email,:passwor,:phone)");
	$stmt->bindParam(':fname', $fname);
    $stmt->bindParam(':lname', $lname);
	$stmt->bindParam(':email', $email);
	$stmt->bindParam(':passwor', $passwor);
    $stmt->bindParam(':phone', $phone);
	if($stmt->execute()) {
		echo "success";
	} else {
		echo "error";
	}
}
if(isset($_POST['validatemail']))
$email = $_POST['validatemail'];

// Prepare the query
$stmt = $pdo->prepare('SELECT COUNT(*) AS count FROM test_2 WHERE email = ?');
$stmt->execute([$email]);

// Get the result
$result = $stmt->fetch(PDO::FETCH_ASSOC);
echo $result['count'];
?>
