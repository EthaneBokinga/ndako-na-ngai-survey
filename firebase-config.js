// Firebase configuration (template)
// Remplacez les valeurs ci-dessous par celles fournies dans la console Firebase
// IMPORTANT: Ne partagez pas ces clés dans des dépôts publics sans précautions.
// Configuration copiée depuis votre console Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDIT5gSjnru3DzW47ERfQTvdS3FseK-uiQ",
  authDomain: "ndakonangai-eb3db.firebaseapp.com",
  projectId: "ndakonangai-eb3db",
  storageBucket: "ndakonangai-eb3db.firebasestorage.app",
  messagingSenderId: "235328554738",
  appId: "1:235328554738:web:d108e0f086f815de1c326b",
  measurementId: "G-SBC56L8SXN"
};

// initialise Firebase si le SDK est chargé et si l'utilisateur a remplacé les valeurs
if(typeof firebase !== 'undefined' && firebaseConfig.apiKey && firebaseConfig.apiKey !== 'YOUR_API_KEY'){
  try{
    firebase.initializeApp(firebaseConfig);
    // expose la db pour les scripts
    window.firebaseApp = firebase;
    window.firebaseDB = firebase.firestore();
    window.firebaseAuth = firebase.auth();
    console.log('Firebase initialisé');
  }catch(err){
    console.warn('Erreur initialisation Firebase', err);
  }
} else {
  console.log('Firebase non configuré. Remplissez firebase-config.js avec votre configuration.');
}
