import firebase from "firebase";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyC6YLFvj4XWDa43ebSKADh-aSvk9jEJfcE",
    authDomain: "nba-login-3cbe4.firebaseapp.com",
    projectId: "nba-login-3cbe4",
    storageBucket: "nba-login-3cbe4.appspot.com",
    messagingSenderId: "1095715225695",
    appId: "1:1095715225695:web:bd4ed589aa78b5475fdbea"
  };

  // Initialize Firebase
  const fire = firebase.initializeApp(firebaseConfig);

  export default fire;