import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyARhmEOMka7XEyhN0t6yG_FfEoVpb56jTE",
  authDomain: "movie-review-7c3c8.firebaseapp.com",
  databaseURL: "https://movie-review-7c3c8.firebaseio.com",
  projectId: "movie-review-7c3c8",
  storageBucket: "movie-review-7c3c8.appspot.com",
  messagingSenderId: "467367989005",
  appId: "1:467367989005:web:e3c099a4749d6c3aceea44",
};

firebase.initializeApp(firebaseConfig);
export default firebase;
