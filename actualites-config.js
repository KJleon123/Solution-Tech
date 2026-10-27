/* =====================================================================
   SOLUTION TECH — PERSONNALISATION DES ACTUALITÉS
   ---------------------------------------------------------------------
   C'est le SEUL fichier à modifier pour publier vos actualités.
   Le bandeau « À la une » de l'accueil et la page Actualités
   se mettent à jour automatiquement.

   COMMENT FAIRE :
   1. Placez votre image dans le dossier images/
   2. Modifiez les champs ci-dessous (garder les guillemets " ")
   3. Enregistrez et mettez le site en ligne

   CHAMPS :
   - categorie : petit libellé (ex. "Formation", "Promotion", "Service")
   - date      : format AAAA-MM-JJ (la plus récente s'affiche en premier)
   - titre     : titre de l'actualité
   - resume    : courte description
   - points    : liste des avantages / contenus (peut rester vide : [])
   - prix      : ex. "15 000 FCFA" (laisser "" pour ne pas afficher de prix)
   - image     : chemin de votre image, ex. "images/affiche-formation.png"
   - lien      : votre lien de vente / d'inscription
                 (si vide "", le bouton ouvre WhatsApp automatiquement)
   - bouton    : texte du bouton (ex. "Acheter maintenant", "S'inscrire")
   - aLaUne    : true  = affichée en grand sur la page d'accueil
                 false = visible uniquement dans la page Actualités
   ===================================================================== */

const ACTUALITES = [

  // ---------- ACTUALITÉ 1 ----------
  {
    categorie: "Formation",
    date: "2026-10-27",
    titre: "Formation Facebook Ads : trouvez plus de clients et vendez plus",
    resume: "Apprenez à lancer vous-même vos publicités Facebook, pas à pas sans agence, même si vous débutez. Plus de visibilité, plus de clients, plus de ventes.",
    points: [
      "Créer et configurer votre page professionnelle",
      "Choisir le bon public et le bon budget",
      "Lancer votre première campagne de A à Z (téléphone et ordinateur)",
      "Transformer les messages reçus en clients",
      "8 modules en PDF, accès immédiat après paiement"
    ],
    prix: "",
    image: "images/Formation_ads.png",
    lien: "https://crhpiawf.mychariow.shop/formation-fb-ads",
    bouton: "Acheter maintenant",
    aLaUne: true
  },

  /* ---------- MODÈLE POUR UNE NOUVELLE ACTUALITÉ ----------
     Copiez ce bloc, collez-le au-dessus de cette ligne,
     puis retirez les symboles de commentaire placés avant et après.

  {
    categorie: "Formation",
    date: "2026-11-15",
    titre: "Titre de l'actualité",
    resume: "Courte description.",
    points: [
      "Point 1",
      "Point 2"
    ],
    prix: "",
    image: "images/mon-image.png",
    lien: "https://votre-lien.com",
    bouton: "Acheter maintenant",
    aLaUne: false
  },
  */

];
