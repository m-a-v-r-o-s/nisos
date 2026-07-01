// English message catalog for the public site - the source of truth.
// Every other locale is typed against `Dictionary`, so a missing key fails the
// build. DB-sourced free text (vehicle/group names, taglines, descriptions) is
// intentionally NOT here: those stay in English wherever they're stored.

export const en = {
  common: {
    bookNow: "Book now",
    book: "Book",
    unavailable: "Unavailable",
    bookedForDates: "Booked for these dates",
    perDay: "/day",
    perDayLong: "per day",
    day: "day",
    days: "days",
    free: "{available} of {total} free",
    fullyBooked: "Fully booked",
    availableCount: "{count} available",
    view: "View →",
    backToFleet: "← Back to fleet",
    seats: "{count} seats",
    auto: "Auto",
    manual: "Manual",
    bags: "{count} bags",
  },
  kinds: {
    CAR: "Car",
    ATV: "ATV",
    BUGGY: "Buggy",
    MOTO: "Scooter",
  },
  fuels: {
    petrol: "Petrol",
    diesel: "Diesel",
    hybrid: "Hybrid",
    electric: "Electric",
  },
  nav: {
    fleet: "Fleet",
    why: "Why Nisos",
    faq: "FAQ",
    contact: "Contact",
  },
  footer: {
    explore: "Explore",
    ourFleet: "Our fleet",
    why: "Why Nisos",
    faq: "FAQ",
    contact: "Contact",
    rights: "© {year} {brand}. All rights reserved.",
    demo: "Akos Digital Sample Website. Images & text are placeholders.",
  },
  brand: {
    tagline: "Wheels for the island, on your terms.",
  },
  home: {
    metaDescription:
      "Cars, ATVs, buggies and scooters for the island. Live availability, instant booking, pay online or on pickup.",
    heroLead:
      "Cars, ATVs, buggies and scooters across the island. Pick your dates, see what’s genuinely free, book in two minutes - pay online or on pickup.",
    fleetEyebrow: "The fleet",
    fleetHeading: "Choose your group",
    seeAll: "See all vehicles",
    whyEyebrow: "Why Nisos",
    whyHeading: "The easy way to get around the island",
    why: [
      {
        title: "Hotel & port delivery",
        body: "We bring the vehicle to where you are and collect it when you’re done. No queues, no detours.",
      },
      {
        title: "Honest, all-in pricing",
        body: "The price you see is the price you pay. Insurance and add-ons are clear before you book.",
      },
      {
        title: "Right vehicle, every trip",
        body: "From a nippy city car to a buggy for the back roads - cars, scooters, quads and buggies, all in one place.",
      },
    ],
    faqEyebrow: "Good to know",
    faqHeading: "Questions, answered",
    faqCall: "Anything else? Call us on",
    featuresHeading: "Flexibility and unbeatable rates on every island rental",
    features: [
      {
        title: "Well-kept vehicles",
        body: "Every car, scooter and quad is serviced regularly, so each trip is safe and smooth.",
      },
      {
        title: "Book in minutes",
        body: "Reserve online in a few taps - quick, simple and no paperwork queues.",
      },
      {
        title: "Honest pricing",
        body: "Competitive rates with no hidden fees. The price you see is the price you pay.",
      },
      {
        title: "Round-the-clock support",
        body: "We're a call away day or night, so you can drive with total peace of mind.",
      },
    ],
    reviewsEyebrow: "Loved by travellers",
    reviewsHeading: "What our guests say",
    reviews: [
      {
        quote:
          "Picked up a scooter right at the port and we were riding within ten minutes. Spotless bike and genuinely friendly staff.",
        name: "Hannah M.",
      },
      {
        quote:
          "Best rates we found in Kos Town and not a single surprise at the desk. We're already planning next summer.",
        name: "Marco R.",
      },
      {
        quote:
          "The buggy made our beach days unforgettable - easy booking and they even delivered it to our hotel.",
        name: "Sophie L.",
      },
    ],
  },
  search: {
    location: "Pick-up location",
    pickup: "Pick-up",
    dropoff: "Drop-off",
    search: "Search availability",
  },
  fleet: {
    title: "Our fleet",
    showing: "Showing availability for {from} → {to} ({days} {unit}) · {location}",
    all: "All",
    vehicleType: "Vehicle type",
    gearbox: "Gearbox",
    noResults: "No vehicles match these filters.",
  },
  faq: [
    {
      q: "How does availability work?",
      a: "Every vehicle is booked individually. The moment one is reserved for your dates it disappears from the results, so what you see is genuinely free. Your confirmation reserves that exact vehicle - or a similar one from the same group if we ever need to swap it.",
    },
    {
      q: "Can I pay on pickup?",
      a: "Yes. At checkout you can pay a deposit online, pay in full online, or choose cash on pickup and settle the whole amount when you collect the vehicle.",
    },
    {
      q: "What licence do I need for the scooters?",
      a: "AM licence for 50cc, A1 for 125cc, and a full A licence for the 325cc bikes. Bring it with you - we check it at pickup.",
    },
    {
      q: "Do you deliver?",
      a: "We can bring the vehicle to your hotel or the port for a small delivery fee, selectable as an add-on during booking.",
    },
    {
      q: "What about a deposit?",
      a: "Each group has a refundable security deposit, shown on the vehicle page. Add full coverage at checkout to waive the excess.",
    },
  ],
  // Keyed by the canonical (English) location stored on the booking.
  locations: {
    "Main Office, Kos Town": "Main Office, Kos Town",
    "Kos Airport": "Kos Airport",
    "Kos Port / Ferry Terminal": "Kos Port / Ferry Terminal",
    "Hotel delivery": "Hotel delivery",
  },
  // Keyed by add-on key; labels mirror packages/db ADD_ONS but display-only.
  addOns: {
    extra_driver: {
      label: "Additional driver",
      description: "Add a second named driver to the contract.",
    },
    child_seat: {
      label: "Child seat",
      description: "Group 1/2/3 seat, fitted at pickup.",
    },
    full_insurance: {
      label: "Full coverage (zero excess)",
      description: "Waives the security deposit excess.",
    },
    delivery: {
      label: "Hotel / port delivery",
      description: "We bring the vehicle to you and collect it.",
    },
  },
  bookingForm: {
    errors: {
      unavailable:
        "Sorry - that vehicle was just booked for those dates. Pick new dates or another vehicle.",
      details: "Please add your name and email so we can confirm the booking.",
      cancelled:
        "Payment was cancelled. Your dates are still held - try again when ready.",
    },
    datesLegend: "Rental dates",
    pickup: "Pick-up",
    dropoff: "Drop-off",
    location: "Location",
    addOnsLegend: "Add-ons",
    perDaySuffix: " / day",
    flatSuffix: " flat",
    detailsLegend: "Your details",
    firstName: "First name",
    lastName: "Last name",
    email: "Email",
    phone: "Phone",
    country: "Country",
    paymentLegend: "Payment",
    payOnline: "Pay online",
    payOnlineDesc: "Card via Stripe - deposit or full amount",
    cash: "Cash on pickup",
    cashDesc: "Reserve now, pay in full when you collect",
    depositNow: "Deposit now",
    depositNowDesc: "Pay 30% today, the rest at pickup",
    payFull: "Pay in full",
    payFullDesc: "Settle the whole rental today",
    summary: "Booking summary",
    rentalTimes: "{price} × {days} {unit}",
    totalRental: "Total rental",
    payAtPickup: "Pay at pickup",
    depositDueNow: "Deposit due now",
    dueNow: "Due now",
    balanceAtPickup: "Balance at pickup",
    depositNote:
      "Refundable security deposit of {deposit} held at pickup. You’re booking this exact vehicle, or a similar one from the same group if a swap is needed.",
    processing: "Processing…",
    reserveCash: "Reserve - pay on pickup",
    continuePayment: "Continue to payment",
  },
  confirmation: {
    title: "You’re booked in",
    intro: "Confirmation {ref} - we’ve emailed the details to {email}.",
    pickup: "Pick-up",
    dropoff: "Drop-off",
    duration: "Duration",
    rentalLabel: "Rental ({price}/day)",
    total: "Total",
    paidNow: "Paid now",
    balanceAtPickup: "Balance at pickup",
    note: "You’ve reserved this exact vehicle, or a similar one from {group} should we need to swap it. A refundable {deposit} security deposit is held at pickup.",
    browseMore: "Browse more vehicles",
    callUs: "Call us",
  },
  paymentStatus: {
    pending: "Unpaid",
    deposit_paid: "Deposit paid",
    paid: "Paid in full",
    refunded: "Refunded",
  },
  cookies: {
    message:
      "We use cookies to improve your experience. By using this site you accept our use of cookies.",
    accept: "Accept",
  },
  whatsapp: "Chat on WhatsApp",
  contact: {
    title: "Contact",
    intro:
      "Vehicle rental in Kos Town - reservations, changes and local support from our team.",
    reachUs: "How to reach us",
    address: "Address",
    phone: "Phone",
    email: "Email",
    hours: "Opening hours",
    talkNow: "Talk to us now",
    talkBody:
      "Call us or send a quick message on WhatsApp - we usually reply within minutes.",
    call: "Call us",
    whatsappCta: "Message on WhatsApp",
    aboutHeading: "About us",
    aboutBody:
      "Nisos Rentals is a local vehicle hire team in Kos Town, offering cars, scooters, ATVs and buggies so you can explore the island at your own pace. We pair a well-maintained fleet with honest rates and personal support from booking to return.",
    locationHeading: "Location",
    locationBody:
      "Find us at our Kos Town office on Akti Miaouli, with pickups also at Kos Airport and the ferry port. We are happy to deliver to your hotel anywhere on the island.",
  },
};

export type Dictionary = typeof en;
