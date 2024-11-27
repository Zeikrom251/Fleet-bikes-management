<?php
$servername = "";
$username = "";
$password = "";
$database = "";

try {
    $db = new PDO("mysql:host=$servername;dbname=$database", $username, $password);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Vérifier si l'ID du vélo est passé dans la requête
    if (isset($_GET['id'])) {
        $bikeID = $_GET['id'];
        // Sélectionner les informations du vélo avec l'ID spécifié
        $sql = "SELECT * FROM Velos WHERE VeloID = :bikeID";
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':bikeID', $bikeID, PDO::PARAM_INT);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        // Retourner les informations sous forme JSON
        echo json_encode($result);
    } else {
        // Si aucun ID de vélo n'est passé, retourner une erreur
        echo json_encode(['error' => 'Aucun ID de vélo spécifié']);
    }
} catch (PDOException $e) {
    echo json_encode(['error' => 'Erreur: ' . $e->getMessage()]);
}
?>