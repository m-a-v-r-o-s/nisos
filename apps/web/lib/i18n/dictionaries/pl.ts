import type { Dictionary } from "./en";

export const pl: Dictionary = {
  common: {
    bookNow: "Zarezerwuj teraz",
    book: "Rezerwuj",
    unavailable: "Niedostępny",
    bookedForDates: "Zarezerwowany na te daty",
    perDay: "/dzień",
    perDayLong: "za dzień",
    day: "dzień",
    days: "dni",
    free: "{available} z {total} wolnych",
    fullyBooked: "Wszystko zajęte",
    availableCount: "{count} dostępnych",
    view: "Zobacz →",
    backToFleet: "← Powrót do floty",
    seats: "{count} miejsc",
    auto: "Automat",
    manual: "Manualna",
    bags: "{count} bagaży",
  },
  kinds: {
    CAR: "Samochód",
    ATV: "Quad",
    BUGGY: "Buggy",
    MOTO: "Skuter",
  },
  fuels: {
    petrol: "Benzyna",
    diesel: "Diesel",
    hybrid: "Hybryda",
    electric: "Elektryczny",
  },
  nav: {
    fleet: "Flota",
    why: "Dlaczego Nisos",
    faq: "FAQ",
    contact: "Kontakt",
  },
  footer: {
    explore: "Odkrywaj",
    ourFleet: "Nasza flota",
    why: "Dlaczego Nisos",
    faq: "FAQ",
    contact: "Kontakt",
    rights: "© {year} {brand}. Wszelkie prawa zastrzeżone.",
    demo: "Akos Digital - Przykładowa strona. Obrazy i teksty są przykładowe.",
  },
  brand: {
    tagline: "Zwiedzaj wyspę na własnych zasadach.",
  },
  home: {
    metaDescription:
      "Samochody, quady, buggy i skutery na wyspę. Dostępność na żywo, natychmiastowa rezerwacja, płatność online lub przy odbiorze.",
    heroLead:
      "Samochody, quady, buggy i skutery po całej wyspie. Wybierz daty, zobacz co jest naprawdę wolne, zarezerwuj w dwie minuty - zapłać online lub przy odbiorze.",
    fleetEyebrow: "Flota",
    fleetHeading: "Wybierz swoją kategorię",
    seeAll: "Zobacz wszystkie pojazdy",
    whyEyebrow: "Dlaczego Nisos",
    whyHeading: "Łatwy sposób na poruszanie się po wyspie",
    why: [
      {
        title: "Dostawa do hotelu i portu",
        body: "Przywozimy pojazd tam, gdzie jesteś, i odbieramy go, gdy skończysz. Bez kolejek, bez objazdów.",
      },
      {
        title: "Uczciwe ceny, wszystko w cenie",
        body: "Cena, którą widzisz, to cena, którą płacisz. Ubezpieczenie i dodatki są jasne przed rezerwacją.",
      },
      {
        title: "Właściwy pojazd na każdą podróż",
        body: "Od zwinnego auta miejskiego po buggy na boczne drogi - samochody, skutery, quady i buggy w jednym miejscu.",
      },
    ],
    faqEyebrow: "Warto wiedzieć",
    faqHeading: "Odpowiedzi na pytania",
    faqCall: "Coś jeszcze? Zadzwoń do nas pod",
    featuresHeading: "Elastyczność i bezkonkurencyjne ceny przy każdym wynajmie na wyspie",
    features: [
      {
        title: "Zadbane pojazdy",
        body: "Każdy samochód, skuter i quad jest regularnie serwisowany, więc każda podróż jest bezpieczna i komfortowa.",
      },
      {
        title: "Rezerwacja w kilka minut",
        body: "Zarezerwuj online w kilka kliknięć - szybko, prosto i bez kolejek po papierki.",
      },
      {
        title: "Uczciwe ceny",
        body: "Konkurencyjne stawki bez ukrytych opłat. Cena, którą widzisz, to cena, którą płacisz.",
      },
      {
        title: "Wsparcie przez całą dobę",
        body: "Jesteśmy o telefon stąd, dniem i nocą, byś mógł jeździć z pełnym spokojem.",
      },
    ],
    reviewsEyebrow: "Uwielbiani przez podróżnych",
    reviewsHeading: "Co mówią nasi goście",
    reviews: [
      {
        quote:
          "Odebraliśmy skuter prosto w porcie i po dziesięciu minutach już jechaliśmy. Nieskazitelny pojazd i naprawdę mili pracownicy.",
        name: "Hannah M.",
      },
      {
        quote:
          "Najlepsze ceny, jakie znaleźliśmy w Kos Town, i żadnych niespodzianek przy ladzie. Już planujemy kolejne lato.",
        name: "Marco R.",
      },
      {
        quote:
          "Buggy sprawiło, że nasze dni na plaży były niezapomniane - łatwa rezerwacja, a nawet dostarczyli je do hotelu.",
        name: "Sophie L.",
      },
    ],
  },
  search: {
    location: "Miejsce odbioru",
    pickup: "Odbiór",
    dropoff: "Zwrot",
    search: "Szukaj dostępności",
  },
  fleet: {
    title: "Nasza flota",
    showing: "Dostępność dla {from} → {to} ({days} {unit}) · {location}",
    all: "Wszystkie",
    vehicleType: "Typ pojazdu",
    gearbox: "Skrzynia biegów",
    noResults: "Żaden pojazd nie pasuje do tych filtrów.",
  },
  faq: [
    {
      q: "Jak działa dostępność?",
      a: "Każdy pojazd rezerwuje się osobno. Gdy tylko jakiś zostanie zarezerwowany na Twoje daty, znika z wyników, więc to, co widzisz, jest naprawdę wolne. Twoje potwierdzenie rezerwuje dokładnie ten pojazd - lub podobny z tej samej kategorii, gdybyśmy musieli go wymienić.",
    },
    {
      q: "Czy mogę zapłacić przy odbiorze?",
      a: "Tak. Przy finalizacji możesz zapłacić zaliczkę online, całość online lub wybrać gotówkę przy odbiorze i uregulować całą kwotę, gdy odbierasz pojazd.",
    },
    {
      q: "Jakiego prawa jazdy potrzebuję na skutery?",
      a: "Prawo jazdy AM na 50cc, A1 na 125cc i pełne prawo jazdy A na motocykle 325cc. Zabierz je ze sobą - sprawdzamy je przy odbiorze.",
    },
    {
      q: "Czy dowozicie?",
      a: "Możemy przywieźć pojazd do Twojego hotelu lub do portu za niewielką opłatą za dostawę, do wyboru jako dodatek podczas rezerwacji.",
    },
    {
      q: "A co z kaucją?",
      a: "Każda kategoria ma zwrotną kaucję, podaną na stronie pojazdu. Dodaj pełną ochronę przy finalizacji, aby znieść udział własny.",
    },
  ],
  locations: {
    "Main Office, Kos Town": "Biuro główne, Kos Town",
    "Kos Airport": "Lotnisko Kos",
    "Kos Port / Ferry Terminal": "Port Kos / Terminal promowy",
    "Hotel delivery": "Dostawa do hotelu",
  },
  addOns: {
    extra_driver: {
      label: "Dodatkowy kierowca",
      description: "Dodaj drugiego wskazanego kierowcę do umowy.",
    },
    child_seat: {
      label: "Fotelik dziecięcy",
      description: "Fotelik grupy 1/2/3, montowany przy odbiorze.",
    },
    full_insurance: {
      label: "Pełna ochrona (zerowy udział własny)",
      description: "Znosi udział własny w kaucji.",
    },
    delivery: {
      label: "Dostawa hotel / port",
      description: "Przywozimy pojazd do Ciebie i go odbieramy.",
    },
  },
  bookingForm: {
    errors: {
      unavailable:
        "Przepraszamy - ten pojazd został właśnie zarezerwowany na te daty. Wybierz nowe daty lub inny pojazd.",
      details: "Podaj imię i adres e-mail, abyśmy mogli potwierdzić rezerwację.",
      cancelled:
        "Płatność została anulowana. Twoje daty są nadal zarezerwowane - spróbuj ponownie, gdy będziesz gotów.",
    },
    datesLegend: "Daty wynajmu",
    pickup: "Odbiór",
    dropoff: "Zwrot",
    location: "Miejsce",
    addOnsLegend: "Dodatki",
    perDaySuffix: " / dzień",
    flatSuffix: " ryczałt",
    detailsLegend: "Twoje dane",
    firstName: "Imię",
    lastName: "Nazwisko",
    email: "Email",
    phone: "Telefon",
    country: "Kraj",
    paymentLegend: "Płatność",
    payOnline: "Zapłać online",
    payOnlineDesc: "Karta przez Stripe - zaliczka lub cała kwota",
    cash: "Gotówka przy odbiorze",
    cashDesc: "Zarezerwuj teraz, zapłać całość przy odbiorze",
    depositNow: "Zaliczka teraz",
    depositNowDesc: "Zapłać 30% dziś, resztę przy odbiorze",
    payFull: "Zapłać całość",
    payFullDesc: "Ureguluj cały wynajem dziś",
    summary: "Podsumowanie rezerwacji",
    rentalTimes: "{price} × {days} {unit}",
    totalRental: "Suma wynajmu",
    payAtPickup: "Płatność przy odbiorze",
    depositDueNow: "Zaliczka do zapłaty teraz",
    dueNow: "Do zapłaty teraz",
    balanceAtPickup: "Pozostała kwota przy odbiorze",
    depositNote:
      "Zwrotna kaucja {deposit} pobierana przy odbiorze. Rezerwujesz dokładnie ten pojazd lub podobny z tej samej kategorii, jeśli potrzebna będzie zamiana.",
    processing: "Przetwarzanie…",
    reserveCash: "Rezerwuj - zapłać przy odbiorze",
    continuePayment: "Przejdź do płatności",
  },
  confirmation: {
    title: "Rezerwacja potwierdzona",
    intro: "Potwierdzenie {ref} - wysłaliśmy szczegóły na adres {email}.",
    pickup: "Odbiór",
    dropoff: "Zwrot",
    duration: "Czas trwania",
    rentalLabel: "Wynajem ({price}/dzień)",
    total: "Suma",
    paidNow: "Zapłacono teraz",
    balanceAtPickup: "Pozostała kwota przy odbiorze",
    note: "Zarezerwowałeś dokładnie ten pojazd lub podobny z {group}, gdybyśmy musieli go wymienić. Zwrotna kaucja {deposit} jest pobierana przy odbiorze.",
    browseMore: "Przeglądaj więcej pojazdów",
    callUs: "Zadzwoń do nas",
  },
  paymentStatus: {
    pending: "Niezapłacone",
    deposit_paid: "Zaliczka zapłacona",
    paid: "Zapłacone w całości",
    refunded: "Zwrócone",
  },
  cookies: {
    title: "Pliki cookie",
    message:
      "Ta strona używa niezbędnych plików cookie, aby działać. Za Twoją zgodą opcjonalne pliki cookie, takie jak analityczne, pomagają nam ją ulepszać. Masz kontrolę: zaakceptuj, odrzuć lub zarządzaj preferencjami.",
    acceptAll: "Akceptuj wszystkie",
    rejectAll: "Odrzuć wszystkie",
    manage: "Zarządzaj preferencjami",
    save: "Zapisz preferencje",
    necessary: "Ściśle niezbędne",
    necessaryDesc: "Wymagane do działania strony, np. bezpieczeństwo i zapisanie tego wyboru.",
    alwaysOn: "Zawsze aktywne",
    analytics: "Analityka",
    analyticsDesc: "Anonimowe statystyki, które pomagają nam zrozumieć, jak korzysta się ze strony.",
  },
  whatsapp: "Czat na WhatsApp",
  contact: {
    title: "Kontakt",
    intro:
      "Wynajem pojazdów w Kos Town - rezerwacje, zmiany i lokalne wsparcie od naszego zespołu.",
    reachUs: "Jak się z nami skontaktować",
    address: "Adres",
    phone: "Telefon",
    email: "Email",
    hours: "Godziny otwarcia",
    talkNow: "Porozmawiaj z nami teraz",
    talkBody:
      "Zadzwoń lub napisz krótką wiadomość na WhatsApp - zwykle odpowiadamy w kilka minut.",
    call: "Zadzwoń do nas",
    whatsappCta: "Napisz na WhatsApp",
    aboutHeading: "O nas",
    aboutBody:
      "Nisos Rentals to lokalny zespół wynajmu w Kos Town, oferujący samochody, skutery, quady i buggy, byś mógł zwiedzać wyspę we własnym tempie. Łączymy zadbaną flotę z uczciwymi cenami i osobistym wsparciem od rezerwacji po zwrot.",
    locationHeading: "Lokalizacja",
    locationBody:
      "Znajdziesz nas w naszym biurze w Kos Town, przy Akti Miaouli, z odbiorem także na lotnisku Kos i w porcie promowym. Chętnie dowieziemy pojazd do Twojego hotelu w dowolne miejsce na wyspie.",
  },
};
