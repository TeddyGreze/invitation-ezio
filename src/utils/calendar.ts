import type { InvitationConfig } from "../config/invitationConfig";

/**
 * Transforme une date "YYYY-MM-DD" + heure "HH:MM" en format calendrier
 * compact "YYYYMMDDTHHMMSS" (ex. 2026-07-12 / 12:00 → "20260712T120000").
 */
const compactDateTime = (date: string, time: string) => {
  const digitsDate = date.replace(/-/g, "");
  const [hours = "00", minutes = "00"] = time.split(":");
  return `${digitsDate}T${hours.padStart(2, "0")}${minutes.padStart(2, "0")}00`;
};

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
