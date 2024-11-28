#include <Arduino.h>
#include <WiFi.h>

#define buzzer 19 // Sortie digital pour piloter le buzzer

// Configuration du point d'accès
const char* ssid_ap = "Greenway-25";
const char* password_ap = "projet2024";

String entete;
String etat_BUZ = "eteint";
String etat_VER = "fermer";

const int LEDV = 4;

WiFiServer server(80);

void setup() {
  Serial.begin(115200);

  pinMode(buzzer, OUTPUT);
  digitalWrite(buzzer, LOW);
  pinMode(LEDV, OUTPUT);

  Serial.println("TEST du prototype du buzzer");
  digitalWrite(buzzer, HIGH);
  delay(2000);
  digitalWrite(buzzer, LOW);
  digitalWrite(LEDV, HIGH);
  delay(1000);
  digitalWrite(LEDV, LOW);

  Serial.println("Configuration du point d'accès...");
  WiFi.softAP(ssid_ap, password_ap);
  IPAddress IP = WiFi.softAPIP();
  Serial.print("IP du point d'accès : ");
  Serial.println(IP);

  server.begin();
}

void loop() {
  WiFiClient client = server.available();

  if (client) {
    Serial.println("Nouveau client");
    String ligne = "";
    entete = "";

    while (client.connected()) {
      if (client.available()) {
        char c = client.read();
        entete += c;

        if (c == '\n') {
          if (ligne.length() == 0) {
            client.println("HTTP/1.1 200 OK");
            client.println("Content-type:text/html");
            client.println("Connection: close");
            client.println();

            // Contrôle des requêtes
            if (entete.indexOf("GET /2/allume") >= 0) {
              Serial.println("Buzzer allumée");
              etat_BUZ = "allume";
              digitalWrite(buzzer, HIGH);
            } else if (entete.indexOf("GET /2/eteint") >= 0) {
              Serial.println("Buzzer éteinte");
              etat_BUZ = "eteint";
              digitalWrite(buzzer, LOW);
            } else if (entete.indexOf("GET /1/ouvert") >= 0) {
              Serial.println("Batterie ouverte");
              etat_VER = "ouvert";
              digitalWrite(LEDV, HIGH);
            } else if (entete.indexOf("GET /1/fermer") >= 0) {
              Serial.println("Batterie fermer");
              etat_VER = "fermer";
              digitalWrite(LEDV, LOW);
            }

            // Réponse HTML
            client.println("<!DOCTYPE html><html>");
            client.println("<head><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">");
            client.println("<link rel=\"icon\" href=\"data:,\">");
            client.print("<style>html { font-family: Helvetica; display: inline-block; margin: 0px auto; text-align: center;}");
            client.print(".button { background-color: #299886; border: none; color: white; padding: 16px 40px; text-decoration: none; font-size: 30px; margin: 2px; cursor: pointer; }");
            client.print(".button1 { background-color: #d35845; border: none; color: white; padding: 16px 40px; text-decoration: none; font-size: 30px; margin: 2px; cursor: pointer;}");
            client.println(".button3 {background-color: #f2b2a8;}");
            client.println(".button2 {background-color: #82d9cb;}</style></head>");
            client.println("<body><h1>Serveur web ESP32</h1>");
            client.println("<p>Buzzer - Etat " + etat_BUZ + "</p>");
            if (etat_BUZ == "eteint") {
              client.println("<p><a href=\"/2/allume\"><button class=\"button\">Allumer</button></a></p>");
            } else {
              client.println("<p><a href=\"/2/eteint\"><button class=\"button button2\">Eteindre</button></a></p>");
            }
            client.println("<p>Batterie lock - Etat "+ etat_VER + "</p>");
            if (etat_VER == "fermer") {
              client.println("<p><a href=\"/1/ouvert\"><button class=\"button button1\">Deverouiller</button></a></p>");
            } else {
              client.println("<p><a href=\"/1/fermer\"><button class=\"button button3\">Verouiller</button></a></p>");
            }
            client.println("</body></html>");
            client.println();
            break;
          } else {
            ligne = "";
          }
        } else if (c != '\r') {
          ligne += c;
        }
      }
    }
    entete = "";
    client.stop();
    Serial.println("Client déconnecté !");
    Serial.println("");
  }
}