<?php
//mysql
$host = 'localhost';
$dbname = 'guvian\'s';
$username = 'root';
$password = '';


//redis
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


if(isset($_GET['session_id'])){
$sessionId = $_GET['session_id'];
$sessionData = $redis->get($sessionId);
if($sessionData){
  echo $sessionData;
}
else{
  echo false;
}
}
    if(isset($_POST['mail'])) {
        $email = $_POST['mail'];
        // $password = $_POST['assword'];
        $stmt = $pdo->prepare("SELECT * FROM test_2 WHERE email = :email");
        $stmt->bindParam(':email', $email);
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if(!empty($user)) {
          $response = array(
            "fname" => $user["fname"],
            "lname" => $user["lname"],
            "email" => $user["email"],
            "phone" => $user["phone"]
        );
        echo json_encode($response);
        } else {
            // User not found
            echo "error";
        }
    }

//destory session


if(isset($_POST['destory'])){
  $sessionId = $_POST['session_id'];
  $redis->del($sessionId);
  if($redis){
    echo "success";
  }else{
    echo "fail";
  }

}

//mongodb

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {

        if (isset($_POST['action']) ) {
           $bulk = new MongoDB\Driver\BulkWrite;
          $data = [
            'mail' => $_POST['email'],
            'password' => $_POST['password'],
            'fname' => $_POST['fname'],
            'lname' => $_POST['lname'],
            'address' => $_POST['address'],
            'gender' => $_POST['gender'],
            'phone' => $_POST['phone'],
            'dob' => $_POST['dob']
          ];
          $_id1 = $bulk->insert($data);
          var_dump($_id1);
          $manager = new MongoDB\Driver\Manager('mongodb://localhost:27017');
          $result = $manager->executeBulkWrite('db.personalInfo',$bulk);
          if ($result->getInsertedCount() == 1) {
            echo "Data inserted successfully.";
          } else {
            echo "Error inserting data.";
          }
  
        
        } 
    }


        if(isset($_POST['update']))
        {
          $email = $_POST['email']; 
$lname = $_POST['lname'];
$fname = $_POST['fname'];
$password = $_POST['password'];
$phone = $_POST['phone'];
$dob = $_POST['dob'];
$gender = $_POST['gender'];
$address = $_POST['address'];

$query = new MongoDB\Driver\Query(['mail' => $email]);
$manager = new MongoDB\Driver\Manager('mongodb://localhost:27017');
$result = $manager->executeQuery('db.personalInfo', $query);
$document = current($result->toArray());

if ($document) {
    $document_id = $document->_id;

    $bulk = new MongoDB\Driver\BulkWrite();
    $bulk->update(
        ['_id' => $document_id],
        ['$set' => [
            'fname' => $fname,
            'lname' => $lname,
            'password' => $password,
            'phone' => $phone,
            'dob' => $dob,
            'gender' => $gender,
            'address' => $address,
        ]]
    );

    $result = $manager->executeBulkWrite('db.personalInfo', $bulk);

    if ($result->getModifiedCount() == 1) {
        // Construct a query to select the document with the specified email and password
        $query = new MongoDB\Driver\Query([
            'mail' => $email
        ]);
        
        // Execute the query and retrieve the document
        $result = $manager->executeQuery('db.personalInfo', $query);
        $document = current($result->toArray());
        
        // Check if the document was found
        if ($document) {
            echo json_encode($document);
        } else {
            // Document not found, echo an error message
            echo "doc not found";
        }
    }
} else {
    // Document not found, echo an error message
    echo "doc not found";
}

      }








       

        //retrive mongodb data's
        

      
    
?>