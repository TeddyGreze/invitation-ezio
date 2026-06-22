import type { InvitationConfig } from "../config/invitationConfig";

/**
 * La Réunion (Indian/Reunion) : UTC+4 toute l'année, sans heure d'été.
 * Utilisé pour horodater les liens Outlook avec le bon décalage.
 */
const REUNION_UTC_OFFSET = "+04:00";

/**
 * Fichier ICS statique hébergé (servi depuis /public). C'est le SEUL artefact
 * ICS du projet : il alimente Apple Calendar, le téléchargement .ics et
 * l'abonnement webcal. Son contenu reflète invitationConfig.calendar
 * (cf. public/calendar/bapteme-ezio.ics).
 */
export const ICS_PUBLIC_PATH = "/calendar/bapteme-ezio.ics";

/**
 * Transforme une date "YYYY-MM-DD" + heure "HH:MM" en format calendrier
 * compact "YYYYMMDDTHHMMSS" (ex. 2026-07-12 / 12:00 → "20260712T120000").
 */
const compactDateTime = (date: string, time: string) => {
  const digitsDate = date.replace(/-/g, "");
  const [hours = "00", minutes = "00"] = time.split(":");
  return `${digitsDate}T${hours.padStart(2, "0")}${minutes.padStart(2, "0")}00`;
};

/** "12:00" → "12:00:00" (format ISO local attendu par Outlook). */
const withSeconds = (time: string) => (time.length === 5 ? `${time}:00` : time);

export const canCreateCalendar = (config: InvitationConfig) =>
  Boolean(config.calendar?.date && config.calendar?.startTime && config.calendar?.endTime);

/**
 * Lien Google Calendar pré-rempli (ouvre la page « TEMPLATE », rien à télécharger).
 */
export const createGoogleCalendarUrl = (config: InvitationConfig) => {
  const { calendar } = config;
  const dates = `${compactDateTime(calendar.date, calendar.startTime)}/${compactDateTime(
    calendar.date,
    calendar.endTime,
  )}`;

  const query = [
    "action=TEMPLATE",
    `text=${encodeURIComponent(calendar.title)}`,
    `dates=${dates}`,
    `details=${encodeURIComponent(calendar.description)}`,
    `location=${encodeURIComponent(calendar.location)}`,
    `ctz=${encodeURIComponent(calendar.timeZone)}`,
  ].join("&");

  return `https://calendar.google.com/calendar/render?${query}`;
};

/**
 * Lien Outlook.com / Microsoft 365 (composition d'événement pré-rempli).
 * URLSearchParams encode proprement espaces, virgules, apostrophes et accents.
 */
export const createOutlookCalendarUrl = (config: InvitationConfig) => {
  const { calendar } = config;
  const params = new URLSearchParams({
    path: "/calendar/action/compose",
    rru: "addevent",
    subject: calendar.title,
    body: calendar.description,
    startdt: `${calendar.date}T${withSeconds(calendar.startTime)}${REUNION_UTC_OFFSET}`,
    enddt: `${calendar.date}T${withSeconds(calendar.endTime)}${REUNION_UTC_OFFSET}`,
    location: calendar.location,
  });

  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
};

/**
 * Lien webcal:// vers le fichier ICS hébergé (abonnement Apple/Google).
 * Construit côté client à partir du domaine courant ; vide côté serveur.
 */
export const createWebcalUrl = () => {
  if (typeof window === "undefined") {
    return "";
  }
  return `webcal://${window.location.host}${ICS_PUBLIC_PATH}`;
};
