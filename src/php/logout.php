<?php

if (isset($_GET['action']) && $_GET['action'] == "deconnexion") {
    // Détruire la session
    session_destroy();
}

// Rediriger vers la page de connexion
header("Location: ../../index.html");
exit();
?>
