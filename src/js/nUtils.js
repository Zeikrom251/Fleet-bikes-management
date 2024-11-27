var hasZoomed = false; // Variable pour suivre si le zoom initial a été effectué

    epsg4326 = new OpenLayers.Projection("EPSG:4326");
    map = new OpenLayers.Map({
      div: "basicMap",
      displayProjection: epsg4326
    });
    map.addLayer(new OpenLayers.Layer.OSM());

    var markers = new OpenLayers.Layer.Markers("echantillons");

    map.addLayer(markers);


    // Fonction pour créer une popup avec quelques détails d'un vélo
    function createPopupContent(data) {
      var content = "<div>";
      content += "<p><strong>Id du vélo:</strong> " + data.VeloID + "</p>";
      content += "<p><strong>Batterie ID :</strong>" + data.BatterieID + "</p>";
      content += "<p><strong>Batterie:</strong> " + data.Autonomie + "%</p>";
      content += "</div>";
      return content;
    }

    // Function to calculate the bounding box of markers
    function calculateMarkersBounds() {
      var bounds = new OpenLayers.Bounds();
      markers.markers.forEach(function(marker) {
        bounds.extend(marker.lonlat);
      });
      return bounds;
    }

    // Fonction pour zoomer sur les markers
    function zoomToMarkersExtent() {
      if (!hasZoomed) { // Effectuer le zoom initial uniquement s'il n'a pas déjà été effectué
        var bounds = calculateMarkersBounds();
        map.zoomToExtent(bounds);
        hasZoomed = true; // Marquer que le zoom initial a été effectué
      }
    }

    // Fonction pour récupérer les données des vélos depuis le serveur et afficher la liste
    function afficherListeVelo() {
      // console.log("Fonction afficherListeVelo() appelée.");
      $.get('../php/selectData.php', function(data) {
        // console.log("Données des vélos récupérées avec succès :", data); // Affiche les données récupérées dans la console
        var velos = JSON.parse(data);
        console.log("Nombre de vélos récupérés :", velos.length); // Affiche le nombre de vélos récupérés dans la console
        
        // Trier les vélos par pourcentage de batterie de la moins chargée à la plus chargée
        velos.sort(function(a, b) {
          return a.Autonomie - b.Autonomie;
        });
        
        var listeHtml = '<ul>';
        // Modifier la boucle for pour inclure le nom de l'utilisateur et styliser la liste
        for (var i = 0; i < velos.length; i++) {
          listeHtml += '<div class="bike-item">';
          listeHtml += '<h3>Vélo ID: ' + velos[i].VeloID + '</h3>';
          listeHtml += '<p><strong>Autonomie: </strong>' + velos[i].Autonomie + '%</p>';
          // Ajouter le bouton "Position" sous chaque vélo
          listeHtml += '<button class="position-button" data-latitude="' + velos[i].Latitude + '" data-longitude="' + velos[i].Longitude + '">Position</button>';
          listeHtml += '<button class="detail-button" data-velo-id="' + velos[i].VeloID + '">Détail</button>';
          listeHtml += '</div>'; // Fermeture de la div bike-item
        }
        listeHtml += '</ul>';
        // console.log("Liste HTML générée :", listeHtml); // Affiche la liste HTML générée dans la console
        $('#bikeList').html(listeHtml);
        // Déterminer la position du bouton et placer la liste juste en dessous
        var buttonPosition = $('#showBikes').position();
        var leftOffset = buttonPosition.left;
        var topOffset = buttonPosition.top + $('#showBikes').outerHeight();
        $('#bikeList').css({left: leftOffset, top: topOffset});
        
        // Attacher un gestionnaire d'événements de clic à chaque bouton "Position"
        $('.position-button').click(function() {
          var latitude = $(this).data('latitude');
          var longitude = $(this).data('longitude');
          var lonLat = new OpenLayers.LonLat(parseFloat(longitude), parseFloat(latitude))
            .transform(
              new OpenLayers.Projection("EPSG:4326"),
              map.getProjectionObject()
            );
          map.setCenter(lonLat, 15); // Zoom modéré sur la position du vélo
        });
      }).fail(function() {
        console.error("Erreur lors de la récupération des données des vélos depuis le serveur.");
      });
    }

    // Toggle bike list on button click
    $('#showBikes').click(function() {
      console.log("Bouton 'Afficher les vélos disponibles' cliqué.");
      afficherListeVelo();
      $('#bikeList').toggle();
    });

    // Fonction pour rafraichir les positions
    function rafraichir_position() {
      $.get('../php/selectData.php', function(data) {
        var points = JSON.parse(data);
        markers.clearMarkers(); // Effacer les markers existants
        for (var i = 0; i < points.length; i++) {
          (function() {
            var lonLatn = new OpenLayers.LonLat(parseFloat(points[i].Longitude), parseFloat(points[i].Latitude))
              .transform(
                new OpenLayers.Projection("EPSG:4326"),
                map.getProjectionObject()
              );

            // Determine marker color based on battery percentage
            var markerColor = points[i].Autonomie > 15 ? '../images/MarkerGreen.png' : '../images/MarkerRed.png';
            // Créer un marker avec un style particulier
            var marker = new OpenLayers.Marker(lonLatn, new OpenLayers.Icon(markerColor, null, null, 0, 25));
            // Ajouter une popup
            var popupContent = createPopupContent(points[i]);
            var popup = new OpenLayers.Popup.FramedCloud(
              "popup_" + i,
              lonLatn,
              null,
              popupContent,
              null,
              true
            );
            marker.events.register("mouseover", marker, function(evt) {
              map.addPopup(popup);
            });
            marker.events.register("mouseout", marker, function(evt) {
              map.removePopup(popup);
            });
            // Ajouter les markers à la couche marker
            markers.addMarker(marker);
          })();
        }
        // Zoom to markers extent after refreshing positions
        zoomToMarkersExtent();
      });
    }

    // Refresh positions every second
    setInterval(rafraichir_position, 5000);

    // Déconnexion
    $('#logoutButton').click(function() {
      $.post('../php/logout.php', function(data) {
        window.location.href = "../../index.html"; // Redirige vers la page de déconnexion
      });
    });

    // Fonction pour afficher les détails complets du vélo
    function afficherDetailsVelo(data) {
      var velosDetails = JSON.parse(data);
      var detailsHtml = "<div class= detailta3levelos>";
      detailsHtml += "<p><strong>Id du vélo:</strong> " + velosDetails.VeloID + "</p>";
      detailsHtml += "<p><strong>Batterie ID :</strong>" + velosDetails.BatterieID + "</p>";
      detailsHtml += "<p><strong>Autonomie :</strong> " + velosDetails.Autonomie + "%</p>";
      detailsHtml += "<p><strong>Latitude :</strong> " + velosDetails.Latitude + "</p>";
      detailsHtml += "<p><strong>Longitude :</strong> " + velosDetails.Longitude + "</p>";
      detailsHtml += "<p><strong>Wifi :</strong> Greenway-" + velosDetails.VeloID + "</p>"
      detailsHtml += "<p><strong>Mot de passe :</strong>" + velosDetails.PasswordWifi + "</p>";
      detailsHtml += '<button id="closeDetailsBtn" onclick= closeDetails()>&times;</button>';
      detailsHtml += '<button class="other-button" data-velo-id = "'+ velosDetails.VeloID +'">BatterieID</button>';
      // Ajoutez d'autres détails au besoin
      detailsHtml += "</div>";

      // Afficher les détails dans le container spécifié
      $('#bikeDetails').html(detailsHtml).show();
    }

    // Attacher un gestionnaire d'événements de clic au bouton "Détail"
    $(document).on('click', '.detail-button', function() {
        var bikeID = this.getAttribute('data-velo-id'); // Récupérer l'ID du vélo sélectionné
        console.log("ID du vélo sélectionné:", bikeID); // Ajoutez ce console.log pour vérifier l'ID récupéré
        // Appeler details.php avec l'ID du vélo
        $.get('../php/selectDetails.php?id=' + bikeID, function(data) {
            // Afficher les détails du vélo récupérés depuis details.php
            afficherDetailsVelo(data);
        });
    });

    // Fonction pour afficher la boîte de dialogue modale
    function afficherDialogue(bikeID) {
        $("#dialog-form").dialog({
            modal: true,
            buttons: {
                "Valider": function() {
                    // Récupérer la valeur du nouveau BatterieID depuis le formulaire
                    var newBatterieID = $("#newBatterieID").val();
                    // Envoyer une requête au serveur pour mettre à jour le BatterieID
                    $.ajax({
                        type: "POST",
                        url: "../php/updateBatterie.php",
                        data: { bikeID: bikeID, newBatterieID: newBatterieID },
                        dataType: "json", // Définir le type de données attendu comme JSON
                        success: function(response) {
                            if (response.success) {
                                // Afficher un message de succès à l'utilisateur
                                alert("BatterieID mis à jour avec succès pour le vélo ID: " + bikeID);
                                // Actualiser la liste des vélos pour refléter les changements
                                afficherListeVelo();
                            } else {
                                // Afficher une popup pour l'erreur
                                alert(response.message);
                            }
                            // Fermer la boîte de dialogue modale après traitement
                            $("#dialog-form").dialog("close");
                        },
                        error: function(xhr, status, error) {
                            // Gérer les erreurs en affichant un message à l'utilisateur
                            alert("Erreur lors de la mise à jour du BatterieID pour le vélo ID: " + bikeID);
                            console.error(xhr.responseText);
                            // Fermer la boîte de dialogue modale en cas d'erreur
                            $("#dialog-form").dialog("close");
                        }
                    });
                },
                "Annuler": function() {
                    // Fermer la boîte de dialogue modale si l'utilisateur clique sur "Annuler"
                    $(this).dialog("close");
                }
            },
            close: function() {
                // Réinitialiser le champ du formulaire lors de la fermeture de la boîte de dialogue modale
                $("#newBatterieID").val("");
            }
        });
    }

    // Attacher un gestionnaire d'événements de clic au bouton "Batterie ID"
    $(document).on('click', '.other-button', function() {
        // Récupérer l'identifiant du vélo associé à cet élément
        var bikeID = this.getAttribute('data-velo-id'); // Récupérer l'ID du vélo sélectionné
        // Afficher la boîte de dialogue modale pour changer le BatterieID
        afficherDialogue(bikeID);
    });

    function closeDetails() {
      $(document).ready(function() {
      // Attacher un gestionnaire d'événements de clic au bouton de fermeture des détails
      $('#closeDetailsBtn').click(function() {
          // Supprimer complètement le conteneur des détails du vélo
          $('#bikeDetails').hide();
        });
      });
    }