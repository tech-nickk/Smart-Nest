auth.onAuthStateChanged(user => {
    if (user) {
        console.log("user logged in");
        // Check if this is a new user
        const userRef = db.ref('UsersData/' + user.uid);
        userRef.once('value').then((snapshot) => {
            if (!snapshot.exists()) {
                // If the user data doesn't exist, create initial data
                userRef.set({
                    email: user.email,
                    temperature: 0,
                    humidity: 0,
                    pressure: 0,
                    deviceState: false
                });
            }
        });
        setupDashboard(user);
    } else {
        console.log("user logged out");
        window.location.href = 'login.html';
    }
});

// ... rest of the auth.js file remains the same


auth.onAuthStateChanged(user => {
    if (user) {
        console.log("user logged in");
        setupDashboard(user);
    } else {
        console.log("user logged out");
        window.location.href = 'login.html';
    }
});

const logout = document.querySelector('#logout-link');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
        window.location.href = 'login.html';
    });
});