import firebase from "firebase";
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDRlGZ0nInzEPOCsGPS9OcFUBQGKD_UVSM",
    authDomain: "cooking-shooking-59e54.firebaseapp.com",
    projectId: "cooking-shooking-59e54",
    storageBucket: "cooking-shooking-59e54.appspot.com",
    messagingSenderId: "477688747236",
    appId: "1:477688747236:web:7e7b9fbee5e7eefa1788f1"
};

//init firebase
firebase.initializeApp(firebaseConfig)

//init services
const projFirestore = firebase.firestore()


export { projFirestore}