function setupDashboard(user) {
    console.log("Setting up dashboard for user:", user.email);

    const dashboard = document.getElementById('dashboard');
    const userEmail = document.getElementById('user-email');
    
    if (dashboard) dashboard.style.display = 'block';
    if (userEmail) userEmail.textContent = user.email;

    const uid = user.uid;




    

    function updateSensorReadings() {
        const basePath = `UsersData/${uid}/CurrentReadings`;

        const dbRefTemp = firebase.database().ref(`${basePath}/temperature`);
        const dbRefHum = firebase.database().ref(`${basePath}/humidity`);
        const dbRefPres = firebase.database().ref(`${basePath}/moisture`);

        dbRefTemp.on('value', snap => {
            const temp = document.getElementById("temp");
            if (snap.exists()) {
                const tempValue = parseFloat(snap.val());
                console.log("Temperature:", tempValue);
                if (temp && !isNaN(tempValue)) temp.innerText = tempValue.toFixed(2);
            } else {
                console.log("No temperature data available");
            }
        }, error => console.error("Error reading temperature:", error));

        dbRefHum.on('value', snap => {
            const hum = document.getElementById("hum");
            if (snap.exists()) {
                const humValue = parseFloat(snap.val());
                console.log("Humidity:", humValue);
                if (hum && !isNaN(humValue)) hum.innerText = humValue.toFixed(2);
            } else {
                console.log("No humidity data available");
            }
        }, error => console.error("Error reading humidity:", error));

        dbRefPres.on('value', snap => {
            const pres = document.getElementById("pres");
            if (snap.exists()) {
                const presValue = parseFloat(snap.val());
                console.log("Moisture:", presValue);
                if (pres && !isNaN(presValue)) pres.innerText = presValue.toFixed(2);
            } else {
                console.log("No moisture data available");
            }
        }, error => console.error("Error reading moisture:", error));
    }

    // Initialize real-time sensor reading updates
    updateSensorReadings();

    // Device control
    const deviceToggle = document.getElementById('device-toggle');
    const deviceStatus = document.getElementById('device-status');
    const dbRefDeviceState = firebase.database().ref(`UsersData/${uid}/actuations/deviceState`);

    if (deviceToggle && deviceStatus) {
        dbRefDeviceState.on('value', (snapshot) => {
            const state = snapshot.val();
            console.log("Device state:", state);
            deviceToggle.checked = state === "ON";
            deviceStatus.textContent = state;
        });

        deviceToggle.addEventListener('change', () => {
            const newState = deviceToggle.checked ? "ON" : "OFF";
            dbRefDeviceState.set(newState).then(() => {
                console.log(`Device state updated to ${newState}`);
                deviceStatus.textContent = newState;
            }).catch((error) => {
                console.error("Error updating device state:", error);
                deviceToggle.checked = !deviceToggle.checked;
                deviceStatus.textContent = deviceToggle.checked ? "ON" : "OFF";
            });
        });
    }
}

// Make sure auth state change is handled
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log("User is signed in:", user.email);
        setupDashboard(user);
    } else {
        console.log("No user is signed in.");
        window.location.href = 'login.html';
    }
});
