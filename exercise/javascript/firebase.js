import * as firebase from 'firebase'
let database
export const init = () => {
  var config = {
    apiKey: "AIzaSyDEjsRbm9xU-mw2N_4vMIH9FPkSqKoIXso",
    authDomain: "movie-ticket-machine-cc.firebaseapp.com",
    databaseURL: "https://movie-ticket-machine-cc.firebaseio.com",
    projectId: "movie-ticket-machine-cc",
    storageBucket: "movie-ticket-machine-cc.appspot.com",
    messagingSenderId: "322809962795"
  };
  firebase.initializeApp(config);
  database = firebase.database();
}