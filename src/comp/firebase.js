import firebase from "firebase/compat/app";

import 'firebase/compat/database';

const firebaseConfig = {
    apiKey: "AIzaSyCAjNRNUwEuZo0nYoXEZvCtTzx8nJi7PQ8",
    authDomain: "exceldata-bd320.firebaseapp.com",
    databaseURL: "https://exceldata-bd320-default-rtdb.firebaseio.com",
    projectId: "exceldata-bd320",
    storageBucket: "exceldata-bd320.appspot.com",
    messagingSenderId: "824622642059",
    appId: "1:824622642059:web:5cf647bdfc19bc6ea2b58e"
  };

  firebase.initializeApp(firebaseConfig);
  export const dataref = firebase.database();
  export default firebase