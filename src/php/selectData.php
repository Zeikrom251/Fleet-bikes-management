<?php
$servername = "";
$username = "";
$password = "";
$database = "";

try {
    $db = new PDO("mysql:host=$servername;dbname=$database", $username, $password);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Sélectionnez les données de vélo avec le nom de l'utilisateur associé
    $sql = "SELECT v.VeloID, v.BatterieID, v.Autonomie, v.Latitude, v.Longitude, c.UserName AS UserName 
            FROM Velos v
            LEFT JOIN Clients c ON v.UserID = c.UserID";

    $stmt = $db->prepare($sql);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $retour = json_encode($result);

    echo $retour;
} catch (PDOException $e) {
    echo "Erreur: " . $e->getMessage();
}
?>