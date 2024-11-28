# IoT Fleet Management For Electric Bikes 🚲

This project is part of a **BTS SNIR** program and focuses on managing the maintenance of a fleet of electric bikes using an **IoT-based web application** enabling technicians to monitor and service bikes efficiently.

## 🌟Project Overview
The goal of this project is to provide a comprehensive system for a company called **Greenway** (*In the project history*) to manage their fleet of electric bikes, ensuring optimal battery performance and efficient maintenance scheduling.

### Key Features
- **Live Bike Monitoring :**
  - Real-time battery status and GPS position updates using **LoRaWAN**.
- **Technician Tools :**
  - Web interface for locating bikes needing maintenance.
  - Unlock and replace batteries with automatic updates to the server.
- **IoT Integration :**
  - Communication between bikes, LoRa gateways, and a centralized IoT server.
- **User-Friendly Design :**
  - Responsive web design for desktop and mobile devices.

---

## ⚙ Technologies Used

### Frontend
- ![HTML](https://img.shields.io/badge/-HTML5-E34F26?logo=html5&logoColor=white&style=flat-square), ![CSS](https://img.shields.io/badge/-CSS3-1572B6?logo=css3&logoColor=white&style=flat-square)
- ![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?logo=javascript&logoColor=black&style=flat-square)

### Backend
- ![PHP](https://img.shields.io/badge/-PHP-777BB4?logo=php&logoColor=white&style=flat-square)
- ![MySQL](https://img.shields.io/badge/-MySQL-4479A1?logo=mysql&logoColor=white&style=flat-square)
- ![C++](https://img.shields.io/badge/-C++-00599C?logo=c%2B%2B&logoColor=white&style=flat-square)

### IoT Components
- **ESP32 :** Embedded system for bike communication.
- **LoRaWAN :** Long-range communication.
- **GPS Receiver :** Geolocation tracking.

### Other Tools
- Node-RED for IoT data flows.
- Visual Studio Code for development.
- [OpenLayers](https://openlayers.org/) (*For interactive maps*).

---

## 📂 Project Structure
```plaintext
Lora Project/
├── index.html         # Main entry point of the web application
├── WiFi/              # WiFi Folder containing c++ files
├── src/
│   ├── css/           # Stylesheets
│   ├── database/      # SQL scripts and database configurations
│   ├── html/          # Additional HTML pages
│   ├── images/        # Image assets
│   ├── js/            # JavaScript scripts
│   └── php/           # Backend scripts

```

---

## 🚀 How to Run the Project
1. **Clone the repository :**
```bash
git clone https://github.com/Zeikrom251/Fleet-bikes-management
.git
```
2. **Set up the database :**
  - Import the SQL scripts located in the `src/database` folder into your MySQL server.
  - Update the database connection settings in the PHP files.
3. **Launch a local server :**
  - Use software like [XAMPP](https://www.apachefriends.org/fr/index.html) or [WAMP](https://wampserver.aviatechno.net/) to run the project locally.
  - Place the project folder in the `htdocs` directory.
4. **Access the application :**
  - Open your browser and navigate to `http://localhost/Lora-Project/index.html`.

---

## 🛠 Functionalities
- **Technician Interface :**
  - View a list of bikes with low battery levels.
  - Connect via Wi-Fi to bikes for maintenance operations.
- **Bike Operations :**
  - Trigger an alarm to locate the bike.
  - Unlock, replace, and reset the battery status.

---

## 🤝 Contributtors
This project was developed as a team effort under the supervision of our teacher. My specific contributions include :
- Developing the web application for the technicians.
- Backend intergration with the IoT server.

---

## 📄 License
This project is licensed under the [MIT License](https://fr.wikipedia.org/wiki/Licence_MIT)
Feel free to fork the project and customize it.
