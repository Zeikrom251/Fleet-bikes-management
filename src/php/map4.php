<?php

$html = <<<HTML
<!DOCTYPE HTML>
<html>
<head>
    <meta charset="UTF-8">
    <title>OpenLayers Demo</title>
    <link rel="stylesheet" href="../css/map.css">
    <script src="http://www.openlayers.org/api/OpenLayers.js"></script>
    <link href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.17/themes/base/jquery-ui.css" rel="stylesheet" type="text/css" />
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
    <script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.17/jquery-ui.min.js"></script>
</head>
<body>
    <div id="mapContainer">
        <div id="basicMap"></div>
        <div id="bikeList" style="display: none;">
            <!-- Contenu de la liste des vélos disponibles sera ajouté ici -->
        </div>
        <div id="bikeDetails"></div>
        <div id="showBikes">Afficher les vélos disponibles</div>
        <a id="logoutButton" href="./login.php?action=deconnexion">Déconnexion</a>
    </div>
    <div id="dialog-form" title="Changer le BatterieID" style="display: none;">
        <form id="updateForm">
            <label for="newBatterieID">Nouveau BatterieID:</label>
            <input type="text" name="newBatterieID" id="newBatterieID" required>
        </form>
    </div>
    <script src="../js/nUtils.js"></script>
</body>
</html>
HTML;

echo $html;
?>
