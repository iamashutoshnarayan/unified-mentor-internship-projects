const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

function postSoilDetails(soilType, characteristics, suitableCrops) {
  db.collection("soils").add({
      soilType, characteristics, suitableCrops,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
  }).then(() => {
      console.log("Soil details posted successfully");
  }).catch(error => {
      console.error("Error posting soil details", error);
  });
}

function postDistributorDetails(name, location, contact) {
  db.collection("distributors").add({
      name, location, contact,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
  }).then(() => {
      console.log("Distributor details posted successfully");
  }).catch(error => {
      console.error("Error posting distributor details", error);
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

function viewSoilDetails() {
  db.collection("soils").get().then(snapshot => {
      snapshot.forEach(doc => {
          console.log("Soil Data:", doc.data());
      });
  }).catch(error => {
      console.error("Error fetching soil details", error);
  });
}

function viewDistributorDetails() {
  db.collection("distributors").get().then(snapshot => {
      snapshot.forEach(doc => {
          console.log("Distributor Data:", doc.data());
      });
  }).catch(error => {
      console.error("Error fetching distributor details", error);
  });
}

document.write(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Soil Farming Agent</title>
  <script src="https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js"></script>
  <script src="https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js"></script>
  <script src="https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js"></script>
</head>
<body>
  <h1>Welcome to Soil Farming Agent</h1>
  <div>
      <h2>Admin Panel</h2>
      <button onclick="postSoilDetails('Loamy', 'Rich in nutrients', 'Wheat, Maize')">Post Soil Details</button>
      <button onclick="postDistributorDetails('AgroWorld', 'Delhi', '9876543210')">Post Distributor Details</button>
  </div>
  <div>
      <h2>User Panel</h2>
      <button onclick="registerUser('user@example.com', 'password123')">Register User</button>
      <button onclick="loginUser('user@example.com', 'password123')">Login User</button>
      <button onclick="viewSoilDetails()">View Soil Details</button>
      <button onclick="viewDistributorDetails()">View Distributor Details</button>
  </div>
</body>
</html>
`);
