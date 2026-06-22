// Lien Google Maps en mode ITINÉRAIRE (ouvre directement la navigation vers la
// destination, sans liste de résultats). Destination encodée proprement.
const buildGoogleMapsDirectionsUrl = (destination: string) =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}&travelmode=driving`;

// Adresse AFFICHÉE dans la section Rendez-vous (libellé humain + lien Maps GPS).
const RECEPTION_ADDRESS = "5 chemin Coupan, 97424 Piton Saint-Leu";

// Adresse EXACTE du lieu utilisée par TOUS les calendriers (Google, Outlook,
// Apple, ICS, webcal). SOURCE UNIQUE — ne jamais dupliquer ailleurs dans le code.
const CALENDAR_LOCATION = "5 Chem. Coupan, Saint-Leu 97424, La Réunion";

export const invitationConfig = {
  babyName: "Ezio",
  birthDate: "17 mai 2026",
  birthIsoDate: "2026-05-17",
  eventTitle: "Baptême d'Ezio",
  expeditionNumber: "001",
  baptismDate: "12 juillet 2026",
  baptismIsoDate: "2026-07-12",
  ceremonyTime: "12h",
  ceremonyEndTime: "",
  // Lieu de la cérémonie (église) — affichage + itinéraire précis
  ceremonyLocation: "Église Notre-Dame de la Salette, Saint-Leu",
  ceremonyMapsUrl: buildGoogleMapsDirectionsUrl(
    "Église Notre-Dame de la Salette, 4 rue Notre Dame de la Salette, 97436 Saint-Leu, La Réunion",
  ),
  // Adresse de réception / célébration — affichage + itinéraire par coordonnées
  // GPS exactes (le texte seul renvoyait vers un mauvais lieu).
  receptionAddress: RECEPTION_ADDRESS,
  receptionMapsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=-21.2093269,55.297468&travelmode=driving",
  celebrationLocation: "Repas festif après la cérémonie",
  celebrationNote: "Rires, souvenirs et surprises au programme.",
  dressCode: "Tenue dans les tons jungle : vert, beige, marron ou naturel",
  confirmationDeadline: "1er juillet 2026",
  treasureNote:
    "Votre présence sera le plus beau trésor pour accompagner Ezio dans cette nouvelle aventure.",
  creoleClosing: "Nou conte si zot, pou fête ça enssamb' nout ti Ezio.",
  parentsNames: "Papa & Maman",
  whatsappNumber: "+33749257509",
  rsvp: {
    enabled: true,
    deadline: "1er juillet 2026",
    provider: "google-sheets",
    endpoint:
      "https://script.google.com/macros/s/AKfycbxz0sdWGw5ZYeI95d-z_epTivlAit6rz2Nx4YY6ROKYnJAHLLGCP5KyWPwAqsYUCcYo/exec",
  },
  heroImage: "/assets/images/hero/hero-jungle-desktop.webp",
  heroImageMobile: "/assets/images/hero/hero-jungle-mobile.webp",
  heroForegroundAssets: {
    leafLeft: "/assets/images/foliage/monstera-01.webp",
    leafTop: "/assets/images/foliage/palm-01.webp",
    compass: "/assets/images/decor/compass.webp",
  },
  sectionIllustrations: {
    journal: {
      desktop: "/assets/images/sections/section-journal-desktop.webp",
      mobile: "/assets/images/sections/section-journal-mobile.webp",
    },
    plan: {
      desktop: "/assets/images/sections/section-plan-desktop.webp",
      mobile: "/assets/images/sections/section-plan-mobile.webp",
    },
    program: {
      desktop: "/assets/images/sections/section-programme-desktop.webp",
      mobile: "/assets/images/sections/section-programme-mobile.webp",
    },
    note: {
      desktop: "/assets/images/sections/section-notes-desktop.webp",
      mobile: "/assets/images/sections/section-notes-mobile.webp",
    },
    rsvp: {
      desktop: "/assets/images/sections/section-rsvp-desktop.webp",
      mobile: "/assets/images/sections/section-rsvp-mobile.webp",
    },
    final: {
      desktop: "/assets/images/sections/section-final-desktop.webp",
      mobile: "/assets/images/sections/section-final-mobile.webp",
    },
  },
  shareTitle: "Baptême d'Ezio",
  shareText:
    "Journal d'explorateur : invitation au baptême d'Ezio, petit explorateur depuis le 17 mai 2026.",
  calendarDescription:
    "Invitation au baptême d'Ezio, une belle expédition familiale à partager ensemble.",
  calendarDurationHours: 3,
  calendar: {
    title: "Baptême d'Ezio",
    date: "2026-07-12",
    startTime: "12:00",
    endTime: "16:00",
    location: CALENDAR_LOCATION,
    timeZone: "Indian/Reunion",
    description:
      "Invitation au baptême d'Ezio. Nous serons heureux de partager cette belle journée avec vous.",
  },
};

export type InvitationConfig = typeof invitationConfig;
