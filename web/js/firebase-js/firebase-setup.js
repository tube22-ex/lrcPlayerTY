const firebaseConfig = {
    apiKey: "AIzaSyAqKDXMjesD-Tr9VCLdISsZKmUUTRo9B9E",
    authDomain: "newtwtube.firebaseapp.com",
    databaseURL: "https://newtwtube-default-rtdb.firebaseio.com",
    projectId: "newtwtube",
    storageBucket: "newtwtube.appspot.com",
    messagingSenderId: "1098841157759",
    appId: "1:1098841157759:web:a0ce8bc5f9d41cfaa90f4a",
    measurementId: "G-M23V047JN2"
    };
    

// Firebaseアプリの初期化
firebase.initializeApp(firebaseConfig);

const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage().ref();
const DB = firebase.database();
console.log(storage)
