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
  ceremonyLocation: "Église / lieu de baptême",
  ceremonyAddress: "32 rue des salines, La Saline les Bains",
  ceremonyMapsUrl:
    "https://www.google.com/maps/search/?api=1&query=32%20rue%20des%20salines%2C%20La%20Saline%20les%20Bains",
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
    location: "32 rue des salines, La Saline les Bains",
    timeZone: "Indian/Reunion",
    description:
      "Invitation au baptême d'Ezio. Nous serons heureux de partager cette belle journée avec vous.",
  },
};

export type InvitationConfig = typeof invitationConfig;
