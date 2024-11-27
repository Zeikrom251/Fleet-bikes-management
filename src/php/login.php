<?php
session_start();

$servername = "";
$username = "";
$password = "";
$database = "";

try {
    $db = new PDO("mysql:host=$servername;dbname=$database", $username, $password);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Récupérer les données du formulaire
        $email = $_POST['email'];
        $password = $_POST['password'];

        // Requête SQL pour récupérer les informations de l'utilisateur
        $sql = "SELECT * FROM Admin WHERE Email = :email";
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':email', $email);
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user) {
            // Vér  fier si le mot de passe correspond
            if ($password == $user['Password']) {
                // Vérifier l'autorité de l'utilisateur
                if ($user['Autorite'] == 'technicien') {
                    // $_SESSION[];
                    // Redirection vers la page map4.html pour les techniciens
                    header("Location: map4.php");
                    exit();
                } elseif ($user['Autorite'] == 'admin') {
                    // Redirection vers le formulaire pour les admins
                    header("Location: formulaire.html");
                    exit();
                } else {
                    // L'utilisateur n'a pas l'autorité requise
                    $error_message = "Vous n'avez pas l'autorité requise pour accéder à cette page.";
                }
            } else {
                // Mot de passe incorrect
                $error_message = "Mot de passe incorrect!";
            }
        } else {
            // Aucun utilisateur trouvé avec cet e-mail
            $error_message = "Utilisateur non trouvé!";
        }        
    }
} catch (PDOException $e) {
    echo "Erreur: " . $e->getMessage();
}

if (isset($_GET['action']) && $_GET['action'] == "deconnexion") {
    // Détruire la session
    session_destroy();
}

?>