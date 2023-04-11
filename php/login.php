<?php
$host = 'localhost';
$dbname = 'guvian\'s';
$username = 'root';
$password = '';

//session using redis

// require '../vendor/autoload.php';
$redis = new Redis();
$redis->connect('localhost');


try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    // set other PDO attributes as needed
} catch(PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
if(isset($_POST['email'])) {
	$email = $_POST['email'];
	$password = $_POST['password'];
	$stmt = $pdo->prepare("SELECT * FROM test_2 WHERE email = :email AND password = :password");
	$stmt->bindParam(':email', $email);
	$stmt->bindParam(':password', $password);
	$stmt->execute();
	$user = $stmt->fetch(PDO::FETCH_ASSOC);
	if($user) {
		$sessionId = uniqid();
		$sessionData = array(
			'email' => $_POST['email'],
			'password' => $_POST['password'],
			// Other session data...
		);
		$redis->set($sessionId, json_encode($sessionData));
		$redis->expire($sessionId, 25);
		echo $sessionId;
	} else {
		echo "error";
	}
}
	
?>