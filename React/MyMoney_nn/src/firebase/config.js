import firebase from "firebase";
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyApMg5L2Wze1t2XFczHJKNOUbJaxv2uR1g",
    authDomain: "mymoney-2d5f6.firebaseapp.com",
    projectId: "mymoney-2d5f6",
    storageBucket: "mymoney-2d5f6.appspot.com",
    messagingSenderId: "1087154335464",
    appId: "1:1087154335464:web:a4376a31d08a71d835235d"
};


//init firebase
firebase.initializeApp(firebaseConfig)

//init service
const projFirestore = firebase.firestore();
const projAuth = firebase.auth();

// timestamp
const timestamp = firebase.firestore.Timestamp

export { projFirestore, projAuth, timestamp }