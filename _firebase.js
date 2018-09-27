import FirebaseApp from 'firebase/app';
import FirebaseDB from 'firebase/database';
import FirebaseStorage from 'firebase/storage';

const config = {
  apiKey: "AIzaSyDEjsRbm9xU-mw2N_4vMIH9FPkSqKoIXso",
  authDomain: "movie-ticket-machine-cc.firebaseapp.com",
  databaseURL: "https://movie-ticket-machine-cc.firebaseio.com",
  projectId: "movie-ticket-machine-cc",
  storageBucket: "movie-ticket-machine-cc.appspot.com",
  messagingSenderId: "322809962795"
};

let firebase = !FirebaseApp.apps.length ? FirebaseApp.initializeApp(config) : FirebaseApp.app();

export default firebase