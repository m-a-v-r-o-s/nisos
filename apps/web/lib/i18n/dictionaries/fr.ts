import type { Dictionary } from "./en";

export const fr: Dictionary = {
  common: {
    bookNow: "Réserver",
    book: "Réserver",
    unavailable: "Indisponible",
    bookedForDates: "Réservé pour ces dates",
    perDay: "/jour",
    perDayLong: "par jour",
    day: "jour",
    days: "jours",
    free: "{available} sur {total} disponibles",
    fullyBooked: "Complet",
    availableCount: "{count} disponibles",
    view: "Voir →",
    backToFleet: "← Retour à la flotte",
    seats: "{count} places",
    auto: "Auto",
    manual: "Manuelle",
    bags: "{count} bagages",
  },
  kinds: {
    CAR: "Voiture",
    ATV: "Quad",
    BUGGY: "Buggy",
    MOTO: "Scooter",
  },
  fuels: {
    petrol: "Essence",
    diesel: "Diesel",
    hybrid: "Hybride",
    electric: "Électrique",
  },
  nav: {
    fleet: "Flotte",
    why: "Pourquoi Nisos",
    faq: "FAQ",
    contact: "Contact",
  },
  footer: {
    explore: "Explorer",
    ourFleet: "Notre flotte",
    why: "Pourquoi Nisos",
    faq: "FAQ",
    contact: "Contact",
    rights: "© {year} {brand}. Tous droits réservés.",
    demo: "Akos Digital - Site exemple. Images et textes sont des espaces réservés.",
  },
  brand: {
    tagline: "Roulez sur l’île, en toute liberté.",
  },
  home: {
    metaDescription:
      "Voitures, quads, buggys et scooters pour l’île. Disponibilité en direct, réservation immédiate, paiement en ligne ou au retrait.",
    heroLead:
      "Voitures, quads, buggys et scooters sur toute l’île. Choisissez vos dates, voyez ce qui est vraiment libre, réservez en deux minutes - payez en ligne ou au retrait.",
    fleetEyebrow: "La flotte",
    fleetHeading: "Choisissez votre catégorie",
    seeAll: "Voir tous les véhicules",
    whyEyebrow: "Pourquoi Nisos",
    whyHeading: "Le moyen facile de circuler sur l’île",
    why: [
      {
        title: "Livraison à l’hôtel et au port",
        body: "Nous amenons le véhicule là où vous êtes et le récupérons quand vous avez fini. Pas de files, pas de détours.",
      },
      {
        title: "Des prix honnêtes, tout compris",
        body: "Le prix que vous voyez est le prix que vous payez. L’assurance et les options sont claires avant de réserver.",
      },
      {
        title: "Le bon véhicule, à chaque trajet",
        body: "D’une citadine agile à un buggy pour les chemins de traverse - voitures, scooters, quads et buggys, tout au même endroit.",
      },
    ],
    faqEyebrow: "Bon à savoir",
    faqHeading: "Réponses à vos questions",
    faqCall: "Autre chose ? Appelez-nous au",
    featuresHeading: "Flexibilité et tarifs imbattables sur chaque location de l’île",
    features: [
      {
        title: "Véhicules bien entretenus",
        body: "Chaque voiture, scooter et quad est révisé régulièrement, pour que chaque trajet soit sûr et agréable.",
      },
      {
        title: "Réservation en minutes",
        body: "Réservez en ligne en quelques clics - rapide, simple et sans paperasse.",
      },
      {
        title: "Des prix honnêtes",
        body: "Des tarifs compétitifs sans frais cachés. Le prix que vous voyez est celui que vous payez.",
      },
      {
        title: "Assistance 24h/24",
        body: "Nous sommes à un appel près, jour et nuit, pour conduire l’esprit tranquille.",
      },
    ],
    reviewsEyebrow: "Plébiscités par les voyageurs",
    reviewsHeading: "Ce que disent nos clients",
    reviews: [
      {
        quote:
          "Nous avons pris un scooter directement au port et roulions dix minutes plus tard. Deux-roues impeccable et personnel vraiment sympathique.",
        name: "Hannah M.",
      },
      {
        quote:
          "Les meilleurs tarifs trouvés à Kos-Ville et aucune surprise au comptoir. Nous planifions déjà l’été prochain.",
        name: "Marco R.",
      },
      {
        quote:
          "Le buggy a rendu nos journées plage inoubliables - réservation facile et ils l’ont même livré à l’hôtel.",
        name: "Sophie L.",
      },
    ],
  },
  search: {
    location: "Lieu de retrait",
    pickup: "Retrait",
    dropoff: "Restitution",
    search: "Rechercher la disponibilité",
  },
  fleet: {
    title: "Notre flotte",
    showing: "Disponibilité pour {from} → {to} ({days} {unit}) · {location}",
    all: "Tous",
    vehicleType: "Type de véhicule",
    gearbox: "Boîte de vitesses",
    noResults: "Aucun véhicule ne correspond à ces filtres.",
  },
  faq: [
    {
      q: "Comment fonctionne la disponibilité ?",
      a: "Chaque véhicule se réserve individuellement. Dès qu’un véhicule est réservé pour vos dates, il disparaît des résultats : ce que vous voyez est donc réellement libre. Votre confirmation réserve exactement ce véhicule - ou un véhicule similaire de la même catégorie si nous devions le remplacer.",
    },
    {
      q: "Puis-je payer au retrait ?",
      a: "Oui. Au paiement, vous pouvez régler un acompte en ligne, payer la totalité en ligne, ou choisir le paiement en espèces au retrait et régler le montant total lorsque vous récupérez le véhicule.",
    },
    {
      q: "Quel permis faut-il pour les scooters ?",
      a: "Permis AM pour les 50 cm³, A1 pour les 125 cm³ et permis A complet pour les motos de 325 cm³. Apportez-le - nous le vérifions au retrait.",
    },
    {
      q: "Faites-vous la livraison ?",
      a: "Nous pouvons amener le véhicule à votre hôtel ou au port moyennant de petits frais de livraison, à sélectionner en option lors de la réservation.",
    },
    {
      q: "Et la caution ?",
      a: "Chaque catégorie a une caution remboursable, indiquée sur la page du véhicule. Ajoutez la couverture totale au paiement pour supprimer la franchise.",
    },
  ],
  locations: {
    "Main Office, Kos Town": "Bureau principal, Kos-Ville",
    "Kos Airport": "Aéroport de Kos",
    "Kos Port / Ferry Terminal": "Port de Kos / Terminal des ferries",
    "Hotel delivery": "Livraison à l’hôtel",
  },
  addOns: {
    extra_driver: {
      label: "Conducteur supplémentaire",
      description: "Ajoutez un second conducteur désigné au contrat.",
    },
    child_seat: {
      label: "Siège enfant",
      description: "Siège groupe 1/2/3, installé au retrait.",
    },
    full_insurance: {
      label: "Couverture totale (sans franchise)",
      description: "Supprime la franchise de la caution.",
    },
    delivery: {
      label: "Livraison hôtel / port",
      description: "Nous amenons le véhicule jusqu’à vous et le récupérons.",
    },
  },
  bookingForm: {
    errors: {
      unavailable:
        "Désolé - ce véhicule vient d’être réservé pour ces dates. Choisissez de nouvelles dates ou un autre véhicule.",
      details: "Veuillez indiquer votre nom et votre e-mail pour que nous puissions confirmer la réservation.",
      cancelled:
        "Le paiement a été annulé. Vos dates sont toujours réservées - réessayez quand vous voulez.",
    },
    datesLegend: "Dates de location",
    pickup: "Retrait",
    dropoff: "Restitution",
    location: "Lieu",
    addOnsLegend: "Options",
    perDaySuffix: " / jour",
    flatSuffix: " forfait",
    detailsLegend: "Vos coordonnées",
    firstName: "Prénom",
    lastName: "Nom",
    email: "E-mail",
    phone: "Téléphone",
    country: "Pays",
    paymentLegend: "Paiement",
    payOnline: "Payer en ligne",
    payOnlineDesc: "Carte via Stripe - acompte ou montant total",
    cash: "Espèces au retrait",
    cashDesc: "Réservez maintenant, payez la totalité au retrait",
    depositNow: "Acompte maintenant",
    depositNowDesc: "Payez 30 % aujourd’hui, le reste au retrait",
    payFull: "Payer la totalité",
    payFullDesc: "Réglez la location entière aujourd’hui",
    summary: "Récapitulatif de la réservation",
    rentalTimes: "{price} × {days} {unit}",
    totalRental: "Total location",
    payAtPickup: "Payer au retrait",
    depositDueNow: "Acompte dû maintenant",
    dueNow: "Dû maintenant",
    balanceAtPickup: "Solde au retrait",
    depositNote:
      "Caution remboursable de {deposit} retenue au retrait. Vous réservez exactement ce véhicule, ou un véhicule similaire de la même catégorie si un échange est nécessaire.",
    processing: "Traitement…",
    reserveCash: "Réserver - payer au retrait",
    continuePayment: "Continuer vers le paiement",
  },
  confirmation: {
    title: "Votre réservation est confirmée",
    intro: "Confirmation {ref} - nous avons envoyé les détails à {email}.",
    pickup: "Retrait",
    dropoff: "Restitution",
    duration: "Durée",
    rentalLabel: "Location ({price}/jour)",
    total: "Total",
    paidNow: "Payé maintenant",
    balanceAtPickup: "Solde au retrait",
    note: "Vous avez réservé exactement ce véhicule, ou un véhicule similaire de {group} si nous devions le remplacer. Une caution remboursable de {deposit} est retenue au retrait.",
    browseMore: "Voir d’autres véhicules",
    callUs: "Appelez-nous",
  },
  paymentStatus: {
    pending: "Non payé",
    deposit_paid: "Acompte payé",
    paid: "Payé en totalité",
    refunded: "Remboursé",
  },
  cookies: {
    title: "Cookies",
    message:
      "Ce site utilise des cookies nécessaires pour fonctionner. Avec votre consentement, des cookies optionnels comme les statistiques nous aident à l’améliorer. Vous gardez le contrôle : accepter, refuser ou gérer vos préférences.",
    acceptAll: "Tout accepter",
    rejectAll: "Tout refuser",
    manage: "Gérer les préférences",
    save: "Enregistrer les préférences",
    necessary: "Strictement nécessaires",
    necessaryDesc: "Nécessaires au fonctionnement du site, comme la sécurité et l’enregistrement de ce choix.",
    alwaysOn: "Toujours actifs",
    analytics: "Statistiques",
    analyticsDesc: "Statistiques anonymes qui nous aident à comprendre comment le site est utilisé.",
  },
  whatsapp: "Discuter sur WhatsApp",
  contact: {
    title: "Contact",
    intro:
      "Location de véhicules à Kos-Ville - réservations, modifications et assistance locale par notre équipe.",
    reachUs: "Comment nous joindre",
    address: "Adresse",
    phone: "Téléphone",
    email: "E-mail",
    hours: "Horaires d’ouverture",
    talkNow: "Parlez-nous maintenant",
    talkBody:
      "Appelez-nous ou envoyez un message rapide sur WhatsApp - nous répondons généralement en quelques minutes.",
    call: "Appelez-nous",
    whatsappCta: "Message sur WhatsApp",
    aboutHeading: "À propos",
    aboutBody:
      "Nisos Rentals est une équipe locale de location à Kos-Ville, proposant voitures, scooters, quads et buggys pour explorer l’île à votre rythme. Nous associons une flotte bien entretenue à des tarifs honnêtes et un accompagnement personnel de la réservation au retour.",
    locationHeading: "Emplacement",
    locationBody:
      "Retrouvez-nous à notre bureau de Kos-Ville, sur Akti Miaouli, avec prise en charge aussi à l’aéroport de Kos et au port des ferries. Nous livrons volontiers à votre hôtel partout sur l’île.",
  },
};
