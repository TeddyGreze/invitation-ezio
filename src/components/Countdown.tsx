import { useEffect, useState } from "react";
import { invitationConfig } from "../config/invitationConfig";

// Cible : jour du baptême à l'heure de la cérémonie (midi).
const TARGET = new Date(`${invitationConfig.baptismIsoDate}T12:00:00`).getTime();

const pad = (value: number) => String(value).padStart(2, "0");

type Remaining = { days: number; hours: number; minutes: number; seconds: number };

const getRemaining = (): Remaining | null => {
  const diff = TARGET - Date.now();
  if (Number.isNaN(diff) || diff <= 0) {
    return null;
  }
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1000),
  };
};

export const Countdown = () => {
  const [remaining, setRemaining] = useState<Remaining | null>(getRemaining);

  useEffect(() => {
    const id = window.setInterval(() => setRemaining(getRemaining()), 1000);
    return () => window.clearInterval(id);
  }, []);

  if (!remaining) {
    return (
      <div className="countdown countdown--done">
        <p className="countdown-done">Le grand jour du baptême d'{invitationConfig.babyName} est arrivé.</p>
      </div>
    );
  }

  const blocks = [
    { value: String(remaining.days), label: remaining.days > 1 ? "Jours" : "Jour" },
    { value: pad(remaining.hours), label: "Heures" },
    { value: pad(remaining.minutes), label: "Minutes" },
    { value: pad(remaining.seconds), label: "Secondes" },
  ];

  return (
    <div className="countdown" role="timer">
      <p className="countdown-eyebrow">Compte à rebours de l'expédition</p>
      <div className="countdown-grid">
        {blocks.map((block) => (
          <div className="countdown-block" key={block.label}>
            <span className="countdown-value">{block.value}</span>
            <span className="countdown-label">{block.label}</span>
          </div>
        ))}
      </div>
      <p className="countdown-caption">avant le baptême d'{invitationConfig.babyName}</p>
    </div>
  );
};
