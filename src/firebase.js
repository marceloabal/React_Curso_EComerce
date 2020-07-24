import * as firebase from 'firebase'


  // Your web app's Firebase configuration
 //const firebaseConfig = {
 var firebaseConfig = {   
    apiKey: "AIzaSyAP-6j2TEWmJ15Fp4BLwFO6binD9s18RcE",
    authDomain: "modulo3-1.firebaseapp.com",
    databaseURL: "https://modulo3-1.firebaseio.com",
    projectId: "modulo3-1",
    storageBucket: "modulo3-1.appspot.com",
    messagingSenderId: "912265852847",
    appId: "1:912265852847:web:20b85d85ec1f0cf778615a"
  };
/*
  service firebase.storage {
    match /b/{bucket}/o {
      match /{allPaths=**} {
        allow read, write: if request.auth != null;
      }
    }
  }
*/
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  db.settings({
    timestampsInSnapshots: true
  });
  firebase.auth = firebase.auth();
  firebase.db=db;
  export default firebase;

