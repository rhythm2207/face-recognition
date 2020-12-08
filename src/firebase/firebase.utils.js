import firebase from 'firebase/app';
import 'firebase/storage';

const config = {
    apiKey: "AIzaSyC2US0HIWI5O7unSeMim3Lsv_dOVvcBkW4",
    authDomain: "file-upload-74b1d.firebaseapp.com",
    databaseURL: "https://file-upload-74b1d.firebaseio.com",
    projectId: "file-upload-74b1d",
    storageBucket: "file-upload-74b1d.appspot.com",
    messagingSenderId: "817203500569",
    appId: "1:817203500569:web:ef8f101e6699e264a53c88",
    measurementId: "G-K7CEQGTES8"
}

firebase.initializeApp(config)

export const storage = firebase.storage()
