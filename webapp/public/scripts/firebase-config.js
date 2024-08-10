const firebaseConfig = {
    apiKey: "AIzaSyBa4IbW4LN0RIv9F-ozZ5g-NZn6u9Ggn1o",
    authDomain: "smart-nest-b9a80.firebaseapp.com",
    projectId: "smart-nest-b9a80",
    storageBucket: "smart-nest-b9a80.appspot.com",
    messagingSenderId: "995400595615",
    appId: "1:995400595615:web:f331a833f1c04a4faf8aaa"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.database();