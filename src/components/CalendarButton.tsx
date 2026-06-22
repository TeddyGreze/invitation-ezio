import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CalendarDays, CalendarPlus, ChevronDown, Download, Rss } from "lucide-react";
import { invitationConfig } from "../config/invitationConfig";
import {
  ICS_PUBLIC_PATH,
  canCreateCalendar,
  createGoogleCalendarUrl,
  createOutlookCalendarUrl,
  createWebcalUrl,
} from "../utils/calendar";

type CalendarButtonProps = {
  variant?: "primary" | "secondary";
  onToast?: (message: string) => void;
};

export const CalendarButton = ({ variant = "secondary", onToast }: CalendarButtonProps) => {
  const enabled = canCreateCalendar(invitationConfig);
  const [open, setOpen] = useState(false);
  // Coordonnées du popover (position: fixed) — calculées sous le bouton.
  const [coords, setCoords] = useState<{ top: number; left: number; width: number } | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  // Le panneau est rendu via un portail sur <body> : on garde une ref pour que
  // les clics à l'intérieur ne soient pas traités comme « clic extérieur ».
  const panelRef = useRef<HTMLDivElement>(null);

  // Positionne le popover juste sous le bouton (popover flottant, hors flux :
  // la carte ne grandit jamais). `fixed` échappe à l'overflow:hidden du parent.
  const updateCoords = useCallback(() => {
    const trigger = triggerRef.current;
    if (!trigger) {
      return;
    }
    const rect = trigger.getBoundingClientRect();
    setCoords({ top: rect.bottom + 8, left: rect.left, width: rect.width });
  }, []);

  const handleToggle = () => {
    if (!open) {
      updateCoords();
    }
    setOpen((value) => !value);
  };

  // Ferme au clic extérieur / Échap ; suit le bouton au scroll et au resize.
  useEffect(() => {
    if (!open) {
      return;
    }
    const onPointer = (event: PointerEvent) => {
      const target = event.target as Node;
      if (wrapRef.current?.contains(target) || panelRef.current?.contains(target)) {
        return;
      }
      setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };
    const onReposition = () => updateCoords();
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onReposition, true);
    window.addEventListener("resize", onReposition);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onReposition, true);
      window.removeEventListener("resize", onReposition);
    };
  }, [open, updateCoords]);

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

  const webcalUrl = createWebcalUrl();

  return (
    <div className="cal-menu" ref={wrapRef}>
      <button
        ref={triggerRef}
        type="button"
        className={`btn ${variant === "primary" ? "btn-primary" : "btn-secondary"} cal-menu-trigger`}
        aria-haspopup="true"
        aria-expanded={open}
        onClick={handleToggle}
      >
        <CalendarPlus size={18} aria-hidden="true" />
        Ajouter au calendrier
        <ChevronDown
          size={16}
          aria-hidden="true"
          className={`cal-menu-chevron ${open ? "is-open" : ""}`}
        />
      </button>

      {open && coords
        ? createPortal(
            <div
              ref={panelRef}
              className="cal-menu-panel"
              role="menu"
              style={{ top: coords.top, left: coords.left, width: coords.width }}
            >
          <a
            role="menuitem"
            className="cal-menu-item"
            href={createGoogleCalendarUrl(invitationConfig)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
          >
            <CalendarDays size={16} aria-hidden="true" />
            Google Calendar
          </a>

          <a
            role="menuitem"
            className="cal-menu-item"
            href={createOutlookCalendarUrl(invitationConfig)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
          >
            <CalendarDays size={16} aria-hidden="true" />
            Outlook
          </a>

          {/* Apple Calendar : le .ics ouvre directement « Ajouter au calendrier » sur iPhone. */}
          <a
            role="menuitem"
            className="cal-menu-item"
            href={ICS_PUBLIC_PATH}
            onClick={() => setOpen(false)}
          >
            <CalendarDays size={16} aria-hidden="true" />
            Apple Calendar
          </a>

          <a
            role="menuitem"
            className="cal-menu-item"
            href={ICS_PUBLIC_PATH}
            download="Bapteme-Ezio.ics"
            onClick={() => setOpen(false)}
          >
            <Download size={16} aria-hidden="true" />
            Télécharger .ics
          </a>

          {webcalUrl ? (
            <a
              role="menuitem"
              className="cal-menu-item"
              href={webcalUrl}
              onClick={() => setOpen(false)}
            >
              <Rss size={16} aria-hidden="true" />
              S'abonner (webcal)
            </a>
          ) : null}
            </div>,
            document.body,
          )
        : null}
    </div>
  );
};
