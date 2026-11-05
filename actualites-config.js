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
    date: "2026-11-01",
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

    // ---------- ACTUALITÉ 2 ----------
  {
    categorie: "Formation",
    date: "2026-11-05",
    titre: "Pack Prompts IA : 40 prompts prêts à copier pour tous les secteurs d'activité",
    resume: "Arrêtez les visuels IA génériques que tout le monde utilise. Avec les bons prompts, créez des affiches, des pubs et des textes de vente réalistes et premium, adaptés à votre activité et à vos clients, même si vous débutez. Un bon prompt = un bon résultat.",
    points: [
      "40 prompts prêts à copier, pour tous les secteurs d'activité",
      "La méthode RTCSF pour créer vos propres prompts",
      "Des visuels pro : affiches, photos produits, logos, miniatures YouTube",
      "Des textes qui vendent : pubs Facebook, statuts WhatsApp, scripts TikTok",
      "16 exemples réels avant / après générés avec l'IA",
      "8 modules en PDF + version Word, accès immédiat après paiement"
    ],
    prix: "",
    image: "images/formation_ia.png",
    lien: "https://crhpiawf.mychariow.shop/pack-prompts-ia",
    bouton: "Acheter maintenant",
    aLaUne: true
  },

];
