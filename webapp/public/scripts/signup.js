const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;
    const passwordConfirm = signupForm['signup-password-confirm'].value;

    // Check if passwords match
    if (password !== passwordConfirm) {
        document.getElementById("error-message").innerHTML = "Passwords do not match";
        return;
    }

    // Sign up the user
    auth.createUserWithEmailAndPassword(email, password).then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log("User signed up:", user);
        signupForm.reset();
        
        // Redirect to the dashboard
        window.location.href = 'index.html';
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        document.getElementById("error-message").innerHTML = errorMessage;
        console.error("Signup error:", errorCode, errorMessage);
    });
});