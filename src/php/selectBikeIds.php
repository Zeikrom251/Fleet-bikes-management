<?php
$servername = "";
$username = "";
$password = "";
$database = "";

try {
    $db = new PDO("mysql:host=$servername;dbname=$database", $username, $password);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "SELECT VeloID FROM Velos";
    $result = $conn->query($sql);

    $velos = array();

    if ($result->num_rows > 0) {
        // Récupérer les IDs des vélos
        while ($row = $result->fetch_assoc()) {
            $velos[] = array('VeloID' => $row['VeloID']);
        }
    }

    echo json_encode($velos);
} catch (PDOException $e) {
    echo "Erreur: " . $e->getMessage();
}
?>