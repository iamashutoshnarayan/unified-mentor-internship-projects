import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

function createDriverAccount(email, password) {
  auth.createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
          console.log("Driver account created", userCredential.user);
      })
      .catch(error => {
          console.error("Error creating driver account", error);
      });
}

function postBusDetails(driverId, busType, contact) {
  db.collection("buses").add({
      driverId, busType, contact,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
  }).then(() => {
      console.log("Bus details posted successfully");
  }).catch(error => {
      console.error("Error posting bus details", error);
  });
}

function registerUser(email, password) {
  auth.createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
          console.log("User registered", userCredential.user);
      })
      .catch(error => {
          console.error("Error registering user", error);
      });
}

function loginUser(email, password) {
  auth.signInWithEmailAndPassword(email, password)
      .then(userCredential => {
          console.log("User logged in", userCredential.user);
      })
      .catch(error => {
          console.error("Error logging in", error);
      });
}

function searchBus(source, destination) {
  db.collection("buses").get().then(snapshot => {
      snapshot.forEach(doc => {
          console.log("Bus Found:", doc.data());
      });
  }).catch(error => {
      console.error("Error searching for buses", error);
  });
}

function logAction(action) {
  console.log(`Action logged: ${action}`);
}

const appHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ebus Management System</title>
  <script src="https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js"></script>
  <script src="https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js"></script>
  <script src="https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js"></script>
</head>
<body>
  <h1>Welcome to Ebus Management System</h1>
  <div>
      <h2>Admin Panel</h2>
      <button onclick="createDriverAccount('driver@example.com', 'password123')">Create Driver Account</button>
  </div>
  <div>
      <h2>Driver Panel</h2>
      <button onclick="postBusDetails('driver1', 'Luxury Bus', '1234567890')">Post Bus Details</button>
  </div>
  <div>
      <h2>User Panel</h2>
      <button onclick="registerUser('user@example.com', 'password123')">Register User</button>
      <button onclick="loginUser('user@example.com', 'password123')">Login User</button>
      <button onclick="searchBus('Source', 'Destination')">Search Bus</button>
  </div>
</body>
</html>
`;

document.write(appHTML);
