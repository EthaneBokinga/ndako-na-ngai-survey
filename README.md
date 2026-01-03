# Ndako na Ngai — Vitrine & Sondage

Prototype simple du site vitrine + formulaire de sondage (mobile-first) pour le projet de soutenance "Ndako na Ngai".

Fichiers créés:
- `index.html` — page principale et formulaire de sondage
- `styles.css` — styles (mobile-first)
- `app.js` — logique front (capture, stockage local et toast)

Comment tester localement:

1) Ouvrir directement `index.html` dans un navigateur (double-clic). Pour certaines fonctionnalités (ex: fetch), un serveur local est préférable.

2) Lancer un serveur local (PowerShell) depuis le dossier du projet:

```powershell
cd "c:/Users/Hp/Documents/ndakoNa ngai"
python -m http.server 8000
# puis ouvrir http://localhost:8000 dans votre navigateur
```

Notes & prochaines étapes possibles:
- Ajouter images/ressources (logo, illustrations) dans le dossier `images/`
- Connecter l'envoi du formulaire à un backend (API) ou Google Sheets
- Intégrer validations plus strictes et analytics
- Améliorer l'accessibilité et traductions si nécessaire

Si vous voulez, je peux :
- Ajouter des icônes SVG locales et images exportées depuis votre maquette Figma
- Générer une version desktop plus proche visuellement de la maquette
- Créer un back-end simple pour stocker les réponses
 
Admin & déploiement
- Une page d'administration simple est fournie : `admin.html` (protection par mot de passe côté client pour démonstration). Elle lit les réponses stockées dans `localStorage` et affiche des statistiques et la liste des réponses.
  
Accéder à l'interface admin
- Ouvrez `admin.html` depuis le dossier du projet (double-clic) ou via votre serveur local à l'URL `http://localhost:8000/admin.html`.
- Lors de l'accès, un mot de passe est demandé (démo côté client) : utilisez `admin123`.
- Remarque importante : c'est une protection très basique pour la démonstration. Pour déployer, je recommande de remplacer par une authentification serveur (Firebase Auth ou backend Express).
- Pour un vrai déploiement (hébergeur gratuit) je recommande Netlify ou GitHub Pages pour ce site statique. Si vous voulez stocker les réponses de façon centralisée, je peux connecter un backend (Firebase Realtime / Firestore ou un petit service Express + Airtable/Sheets).
 - Pour un vrai déploiement (hébergeur gratuit) je recommande Netlify ou Vercel pour ce site statique. Si vous voulez stocker les réponses de façon centralisée, je recommande Firebase Firestore (rapide à configurer) : ci-dessous les étapes.

Sécurité: la page `admin.html` utilise un mot de passe côté client uniquement pour la démo. Pour production, il faudra un vrai backend et authentification.

Dites-moi quelle partie vous voulez que je développe ensuite.

Guide rapide : configurer Firebase (Firestore + Auth)
1. Allez sur https://console.firebase.google.com et créez un projet.
2. Dans "Firestore Database" : créez une base en mode test (ou en règles restreintes si vous savez configurer les règles).
3. Dans "Authentication" > Méthode de connexion : activez "Email/Password".
4. Créez un utilisateur administrateur (Authentication > Users > Add user) qui servira pour la page `admin.html`.
5. Récupérez la configuration du projet (Project Settings > SDK) et copiez-la dans `firebase-config.js` à la place des valeurs `YOUR_...`.
6. Déployez sur Netlify/Vercel (ou Firebase Hosting). Pour Netlify / Vercel, liez votre repo GitHub et déployez la branche principale. Pour Firebase Hosting, suivez `firebase init` puis `firebase deploy`.

Notes:
- `admin.html` utilise Firebase Auth : connectez-vous avec l'utilisateur créé pour afficher les réponses stockées dans Firestore.
- Si vous préférez, je peux effectuer cette configuration Firebase pour vous (je générerai les instructions exactes et les fichiers à remplir), ou créer un petit backend Node/Express si vous voulez plus de contrôle.
