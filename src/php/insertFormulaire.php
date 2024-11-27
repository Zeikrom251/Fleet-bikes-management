<?php
// Vérifier si toutes les données nécessaires sont envoyées
if (isset($_POST['nom'], $_POST['prenom'], $_POST['numero'], $_POST['email'])) {
    $nom = $_POST['nom'];
    $prenom = $_POST['prenom'];
    $numero = $_POST['numero'];
    $email = $_POST['email'];

    $servername = "";
    $username = "";
    $password = "";
    $database = "";

    try {
        // Connexion à la base de données
        $db = new PDO("mysql:host=$servername;dbname=$database", $username, $password);
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Déterminer le nouvel ID utilisateur
        $sql_max_user_id = "SELECT MAX(userID) AS max_user_id FROM Clients";
        $stmt_max_user_id = $db->query($sql_max_user_id);
        $max_user_id_row = $stmt_max_user_id->fetch(PDO::FETCH_ASSOC);
        $new_user_id = $max_user_id_row['max_user_id'] + 1;

        // Préparer et exécuter la requête d'insertion
        $sql_insert_user = "INSERT INTO Clients (userID, UserName, Surname, Email, Numero) VALUES (:userID, :nom, :prenom, :email, :numero)";
        $stmt_insert_user = $db->prepare($sql_insert_user);
        $stmt_insert_user->bindParam(':userID', $new_user_id);
        $stmt_insert_user->bindParam(':nom', $nom);
        $stmt_insert_user->bindParam(':prenom', $prenom);
        $stmt_insert_user->bindParam(':email', $email);
        $stmt_insert_user->bindParam(':numero', $numero);
        $stmt_insert_user->execute();

        // Afficher un message de succès
        echo json_encode(['success' => true, 'message' => 'Utilisateur ajouté avec succès.']);
    } catch (PDOException $e) {
        // Afficher une erreur en cas d'échec
        echo json_encode(['success' => false, 'message' => 'Erreur: ' . $e->getMessage()]);
    }
} else {
    // Si des données manquent, retourner une erreur
    echo json_encode(['success' => false, 'message' => 'Erreur: Veuillez remplir tous les champs du formulaire.']);
}
?>
