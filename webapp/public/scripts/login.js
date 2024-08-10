const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = loginForm['input-email'].value;
    const password = loginForm['input-password'].value;
    auth.signInWithEmailAndPassword(email, password).then((cred) => {
        loginForm.reset();
        window.location.href = 'index.html';
    }).catch((error) => {
        document.getElementById("error-message").innerHTML = error.message;
    });
});