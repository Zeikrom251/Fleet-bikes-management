<?php
$servername = "";
$username = "";
$password = "";
$database = "";

// Initialiser un tableau pour stocker les données de réponse
$response = array();

// Vérifier si les données POST ont été envoyées
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Récupérer les données du formulaire
    $bikeID = $_POST["bikeID"];
    $newBatterieID = $_POST["newBatterieID"];

    try {
        // Connexion à la base de données
        $db = new PDO("mysql:host=$servername;dbname=$database", $username, $password);
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Vérifier si le BatterieID existe dans la table Batterie
        $checkBatterie = $db->prepare("SELECT * FROM Batterie WHERE BatterieID = :newBatterieID");
        $checkBatterie->bindParam(':newBatterieID', $newBatterieID);
        $checkBatterie->execute();
        $batterieExists = $checkBatterie->fetch();

        if ($batterieExists) {
            // Si le BatterieID existe, procéder à la mise à jour
            // Préparer et exécuter la requête de mise à jour pour Velos
            $sqlVelos = "UPDATE Velos SET BatterieID = :newBatterieID WHERE VeloID = :bikeID";
            $stmtVelos = $db->prepare($sqlVelos);
            $stmtVelos->bindParam(':newBatterieID', $newBatterieID);
            $stmtVelos->bindParam(':bikeID', $bikeID);
            $stmtVelos->execute();

            // Préparer et exécuter la requête de mise à jour pour Batterie
            $sqlBatterie = "UPDATE Batterie SET chargeCycle = chargeCycle + 1 WHERE BatterieID = :newBatterieID";
            $stmtBatterie = $db->prepare($sqlBatterie);
            $stmtBatterie->bindParam(':newBatterieID', $newBatterieID);
            $stmtBatterie->execute();

            // Répondre avec un message de succès
            $response['success'] = true;
            $response['message'] = "Mise à jour réussie pour le vélo ID: $bikeID avec le nouveau BatterieID: $newBatterieID. La colonne chargeCycle dans la table Batterie a été mise à jour.";
        } else {
            // Si le BatterieID n'existe pas, envoyer un message d'erreur
            $response['success'] = false;
            $response['message'] = "L'ID de batterie entré n'existe pas dans la base de données.";
        }
    } catch (PDOException $e) {
        // En cas d'erreur, répondre avec un message d'erreur
        $response['success'] = false;
        $response['message'] = "Erreur lors de la mise à jour du BatterieID pour le vélo ID: $bikeID";
    }
} else {
    // Si aucune donnée POST n'a été envoyée, répondre avec un message d'erreur
    $response['success'] = false;
    $response['message'] = "Aucune donnée POST reçue pour la mise à jour du BatterieID";
}

// Convertir le tableau de réponse en JSON et l'afficher
echo json_encode($response);
?>
