$(document).ready(function() {
    // Ecouter l'événement de soumission du formulaire
    $('#userForm').submit(function(event) {
        // Empêcher le comportement par défaut de soumission du formulaire
        event.preventDefault();
        
        // Récupérer les données du formulaire
        var formData = $(this).serialize();

        // Envoyer les données à votre script PHP via une requête AJAX
        $.ajax({
            type: 'POST',
            url: '../php/insertFormulaire.php',
            data: formData,
            dataType: 'json',
            success: function(response) {
                // Afficher le message de succès ou d'erreur
                alert(response.message);
            },
            error: function(xhr, status, error) {
                // En cas d'erreur de la requête AJAX, afficher l'erreur dans la console
                console.error(xhr.responseText);
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    // Fonction pour récupérer les IDs des vélos depuis le serveur
    function getBikesId() {
        $.get('selectBikeIds.php', function(data) {
            var velos = JSON.parse(data);

            var select = $('#idSelect');
            velos.forEach(function(velo) {
                var option = $('<option></option>').val(velo.VeloID).text('Vélo ID: ' + velos.VeloID);
                select.append(option);
            });
        }).fail(function() {
            console.error("Erreur lors de la récupération des données des vélos");
        });
    }

    getBikesId(); // Appel de la fonction
})

// Déconnexion
$('#logoutButton').click(function() {
        $.post('../php/logout.php', function(data) {
            window.location.href = "../../index.html"; // Redirige vers la page de déconnexion
        });
    });