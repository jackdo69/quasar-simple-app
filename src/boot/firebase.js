
import * as firebase from "firebase/app";

import "firebase/auth";
import "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyA2n0x0pL1BJsjVAuFSP8XjWgDow39qGm4",
    authDomain: "foods-66151.firebaseapp.com",
    databaseURL: "https://foods-66151.firebaseio.com",
    projectId: "foods-66151",
    storageBucket: "foods-66151.appspot.com",
    messagingSenderId: "47367386921",
    appId: "1:47367386921:web:14b69f06aab8f1ca252938"
};


let firebaseApp = firebase.initializeApp(firebaseConfig);
let firebaseAuth = firebaseApp.auth()
let firebaseDb = firebaseApp.database()

export { firebaseAuth, firebaseDb }