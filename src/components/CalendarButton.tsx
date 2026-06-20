import { CalendarPlus } from "lucide-react";
import { invitationConfig } from "../config/invitationConfig";
import { canCreateCalendar, createGoogleCalendarUrl } from "../utils/calendar";

type CalendarButtonProps = {
  variant?: "primary" | "secondary";
  onToast?: (message: string) => void;
};

export const CalendarButton = ({ variant = "secondary", onToast }: CalendarButtonProps) => {
  const enabled = canCreateCalendar(invitationConfig);

  if (!enabled) {
    return (
      <button
        className={`btn ${variant === "primary" ? "btn-primary" : "btn-secondary"}`}
        type="button"
        aria-disabled="true"
        onClick={() => onToast?.("Informations bientôt disponibles pour le calendrier.")}
      >
        <CalendarPlus size={18} aria-hidden="true" />
        Infos calendrier bientôt disponibles
      </button>
    );
  }

  const googleUrl = createGoogleCalendarUrl(invitationConfig);

  return (
    <a
      className={`btn ${variant === "primary" ? "btn-primary" : "btn-secondary"}`}
      href={googleUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      <CalendarPlus size={18} aria-hidden="true" />
      Ajouter au calendrier
    </a>
  );
};
