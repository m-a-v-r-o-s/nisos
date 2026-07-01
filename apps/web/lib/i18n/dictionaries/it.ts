import type { Dictionary } from "./en";

export const it: Dictionary = {
  common: {
    bookNow: "Prenota ora",
    book: "Prenota",
    unavailable: "Non disponibile",
    bookedForDates: "Prenotato per queste date",
    perDay: "/giorno",
    perDayLong: "al giorno",
    day: "giorno",
    days: "giorni",
    free: "{available} di {total} liberi",
    fullyBooked: "Tutto prenotato",
    availableCount: "{count} disponibili",
    view: "Vedi →",
    backToFleet: "← Torna alla flotta",
    seats: "{count} posti",
    auto: "Automatico",
    manual: "Manuale",
    bags: "{count} bagagli",
  },
  kinds: {
    CAR: "Auto",
    ATV: "ATV",
    BUGGY: "Buggy",
    MOTO: "Scooter",
  },
  fuels: {
    petrol: "Benzina",
    diesel: "Diesel",
    hybrid: "Ibrido",
    electric: "Elettrico",
  },
  nav: {
    fleet: "Flotta",
    why: "Perché Nisos",
    faq: "FAQ",
    contact: "Contatti",
  },
  footer: {
    explore: "Esplora",
    ourFleet: "La nostra flotta",
    why: "Perché Nisos",
    faq: "FAQ",
    contact: "Contatti",
    rights: "© {year} {brand}. Tutti i diritti riservati.",
    demo: "Akos Digital - Sito di esempio. Immagini e testi sono segnaposto.",
  },
  brand: {
    tagline: "Esplora l’isola a modo tuo.",
  },
  home: {
    metaDescription:
      "Auto, ATV, buggy e scooter per l’isola. Disponibilità in tempo reale, prenotazione immediata, paga online o al ritiro.",
    heroLead:
      "Auto, ATV, buggy e scooter in tutta l’isola. Scegli le date, vedi cosa è davvero libero, prenota in due minuti - paga online o al ritiro.",
    fleetEyebrow: "La flotta",
    fleetHeading: "Scegli la tua categoria",
    seeAll: "Vedi tutti i veicoli",
    whyEyebrow: "Perché Nisos",
    whyHeading: "Il modo facile per muoverti sull’isola",
    why: [
      {
        title: "Consegna in hotel e al porto",
        body: "Portiamo il veicolo dove sei tu e lo ritiriamo quando hai finito. Niente code, niente deviazioni.",
      },
      {
        title: "Prezzi onesti, tutto incluso",
        body: "Il prezzo che vedi è il prezzo che paghi. Assicurazione ed extra sono chiari prima di prenotare.",
      },
      {
        title: "Il veicolo giusto, per ogni viaggio",
        body: "Da un’agile citycar a un buggy per le strade sterrate - auto, scooter, quad e buggy, tutto in un posto.",
      },
    ],
    faqEyebrow: "Buono a sapersi",
    faqHeading: "Risposte alle tue domande",
    faqCall: "Altro? Chiamaci al",
    featuresHeading: "Flessibilità e tariffe imbattibili per ogni noleggio sull’isola",
    features: [
      {
        title: "Veicoli ben tenuti",
        body: "Ogni auto, scooter e quad è sottoposto a manutenzione regolare, così ogni viaggio è sicuro e piacevole.",
      },
      {
        title: "Prenoti in pochi minuti",
        body: "Prenota online con pochi tap - veloce, semplice e senza code di scartoffie.",
      },
      {
        title: "Prezzi onesti",
        body: "Tariffe competitive senza costi nascosti. Il prezzo che vedi è quello che paghi.",
      },
      {
        title: "Assistenza 24 ore su 24",
        body: "Siamo a una telefonata di distanza, giorno e notte, per guidare in tutta tranquillità.",
      },
    ],
    reviewsEyebrow: "Amati dai viaggiatori",
    reviewsHeading: "Cosa dicono i nostri ospiti",
    reviews: [
      {
        quote:
          "Abbiamo ritirato uno scooter al porto e in dieci minuti eravamo in strada. Mezzo impeccabile e personale davvero gentile.",
        name: "Hannah M.",
      },
      {
        quote:
          "Le tariffe migliori trovate a Kos Town e nessuna sorpresa al banco. Stiamo già pianificando la prossima estate.",
        name: "Marco R.",
      },
      {
        quote:
          "Il buggy ha reso indimenticabili le nostre giornate al mare - prenotazione facile e ce l’hanno portato in hotel.",
        name: "Sophie L.",
      },
    ],
  },
  search: {
    location: "Luogo di ritiro",
    pickup: "Ritiro",
    dropoff: "Riconsegna",
    search: "Cerca disponibilità",
  },
  fleet: {
    title: "La nostra flotta",
    showing: "Disponibilità per {from} → {to} ({days} {unit}) · {location}",
    all: "Tutti",
    vehicleType: "Tipo di veicolo",
    gearbox: "Cambio",
    noResults: "Nessun veicolo corrisponde a questi filtri.",
  },
  faq: [
    {
      q: "Come funziona la disponibilità?",
      a: "Ogni veicolo si prenota singolarmente. Nel momento in cui uno viene riservato per le tue date scompare dai risultati, quindi ciò che vedi è davvero libero. La tua conferma riserva esattamente quel veicolo - o uno simile della stessa categoria se mai dovessimo sostituirlo.",
    },
    {
      q: "Posso pagare al ritiro?",
      a: "Sì. Al checkout puoi pagare un acconto online, l’intero importo online, oppure scegliere contanti al ritiro e saldare tutto quando ritiri il veicolo.",
    },
    {
      q: "Che patente serve per gli scooter?",
      a: "Patente AM per i 50cc, A1 per i 125cc e patente A completa per le moto da 325cc. Portala con te - la controlliamo al ritiro.",
    },
    {
      q: "Effettuate la consegna?",
      a: "Possiamo portare il veicolo al tuo hotel o al porto con un piccolo costo di consegna, selezionabile come extra durante la prenotazione.",
    },
    {
      q: "E la cauzione?",
      a: "Ogni categoria ha una cauzione rimborsabile, indicata nella pagina del veicolo. Aggiungi la copertura totale al checkout per azzerare la franchigia.",
    },
  ],
  locations: {
    "Main Office, Kos Town": "Ufficio principale, Kos Town",
    "Kos Airport": "Aeroporto di Kos",
    "Kos Port / Ferry Terminal": "Porto di Kos / Terminal traghetti",
    "Hotel delivery": "Consegna in hotel",
  },
  addOns: {
    extra_driver: {
      label: "Conducente aggiuntivo",
      description: "Aggiungi un secondo conducente nominato al contratto.",
    },
    child_seat: {
      label: "Seggiolino",
      description: "Seggiolino gruppo 1/2/3, montato al ritiro.",
    },
    full_insurance: {
      label: "Copertura totale (franchigia zero)",
      description: "Azzera la franchigia della cauzione.",
    },
    delivery: {
      label: "Consegna hotel / porto",
      description: "Portiamo il veicolo da te e lo ritiriamo.",
    },
  },
  bookingForm: {
    errors: {
      unavailable:
        "Spiacenti - questo veicolo è appena stato prenotato per quelle date. Scegli nuove date o un altro veicolo.",
      details: "Inserisci nome ed email così possiamo confermare la prenotazione.",
      cancelled:
        "Il pagamento è stato annullato. Le tue date sono ancora bloccate - riprova quando vuoi.",
    },
    datesLegend: "Date del noleggio",
    pickup: "Ritiro",
    dropoff: "Riconsegna",
    location: "Luogo",
    addOnsLegend: "Extra",
    perDaySuffix: " / giorno",
    flatSuffix: " forfait",
    detailsLegend: "I tuoi dati",
    firstName: "Nome",
    lastName: "Cognome",
    email: "Email",
    phone: "Telefono",
    country: "Paese",
    paymentLegend: "Pagamento",
    payOnline: "Paga online",
    payOnlineDesc: "Carta tramite Stripe - acconto o importo totale",
    cash: "Contanti al ritiro",
    cashDesc: "Prenota ora, paga tutto al ritiro",
    depositNow: "Acconto ora",
    depositNowDesc: "Paga il 30% oggi, il resto al ritiro",
    payFull: "Paga tutto",
    payFullDesc: "Salda l’intero noleggio oggi",
    summary: "Riepilogo prenotazione",
    rentalTimes: "{price} × {days} {unit}",
    totalRental: "Totale noleggio",
    payAtPickup: "Paga al ritiro",
    depositDueNow: "Acconto dovuto ora",
    dueNow: "Dovuto ora",
    balanceAtPickup: "Saldo al ritiro",
    depositNote:
      "Cauzione rimborsabile di {deposit} trattenuta al ritiro. Stai prenotando esattamente questo veicolo, o uno simile della stessa categoria se serve una sostituzione.",
    processing: "Elaborazione…",
    reserveCash: "Prenota - paga al ritiro",
    continuePayment: "Procedi al pagamento",
  },
  confirmation: {
    title: "Prenotazione confermata",
    intro: "Conferma {ref} - abbiamo inviato i dettagli a {email}.",
    pickup: "Ritiro",
    dropoff: "Riconsegna",
    duration: "Durata",
    rentalLabel: "Noleggio ({price}/giorno)",
    total: "Totale",
    paidNow: "Pagato ora",
    balanceAtPickup: "Saldo al ritiro",
    note: "Hai riservato esattamente questo veicolo, o uno simile di {group} se dovessimo sostituirlo. Una cauzione rimborsabile di {deposit} viene trattenuta al ritiro.",
    browseMore: "Sfoglia altri veicoli",
    callUs: "Chiamaci",
  },
  paymentStatus: {
    pending: "Non pagato",
    deposit_paid: "Acconto pagato",
    paid: "Pagato per intero",
    refunded: "Rimborsato",
  },
  cookies: {
    message:
      "Usiamo i cookie per migliorare la tua esperienza. Utilizzando questo sito accetti l’uso dei cookie.",
    accept: "Accetta",
  },
  whatsapp: "Chatta su WhatsApp",
  contact: {
    title: "Contatti",
    intro:
      "Noleggio veicoli a Kos Town - prenotazioni, modifiche e assistenza locale dal nostro team.",
    reachUs: "Come raggiungerci",
    address: "Indirizzo",
    phone: "Telefono",
    email: "Email",
    hours: "Orari di apertura",
    talkNow: "Parla subito con noi",
    talkBody:
      "Chiamaci o inviaci un messaggio veloce su WhatsApp - di solito rispondiamo in pochi minuti.",
    call: "Chiamaci",
    whatsappCta: "Scrivici su WhatsApp",
    aboutHeading: "Chi siamo",
    aboutBody:
      "Nisos Rentals è un team locale di noleggio a Kos Town, con auto, scooter, quad e buggy per esplorare l’isola al tuo ritmo. Uniamo una flotta ben tenuta a tariffe oneste e assistenza personale dalla prenotazione alla riconsegna.",
    locationHeading: "Posizione",
    locationBody:
      "Ci trovi nel nostro ufficio a Kos Town, su Akti Miaouli, con ritiri anche all’aeroporto di Kos e al porto dei traghetti. Consegniamo volentieri al tuo hotel in qualsiasi parte dell’isola.",
  },
};
