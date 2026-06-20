import { useRef, useState, type FormEvent } from "react";
import { CheckCircle2, PartyPopper, Send } from "lucide-react";
import { invitationConfig } from "../config/invitationConfig";
import { PaperCard, Reveal, SectionDecor, SectionHeader, Stamp } from "./DecorativeElements";
import { FloatingButterflies } from "./FloatingButterflies";
import { Particles } from "./Particles";

type RsvpFormData = {
  name: string;
  attendance: string;
  adults: string;
  children: string;
  message: string;
  diet: string;
};

type Status = "idle" | "sending" | "success" | "error";

const initialForm: RsvpFormData = {
  name: "",
  attendance: "Présent(e)",
  adults: "2",
  children: "0",
  message: "",
  diet: "",
};

export const RSVPForm = () => {
  const { rsvp } = invitationConfig;
  const [form, setForm] = useState<RsvpFormData>(initialForm);
  const [status, setStatus] = useState<Status>("idle");
  // Hauteur figée du corps de la carte pour éviter le saut de page au succès.
  const bodyRef = useRef<HTMLDivElement>(null);
  const [lockedHeight, setLockedHeight] = useState<number | undefined>(undefined);

  if (!rsvp.enabled) {
    return null;
  }

  // Endpoint Google Apps Script (cf. invitationConfig.rsvp.endpoint).
  const configured = Boolean(rsvp.endpoint);

  const update =
    (key: keyof RsvpFormData) =>
    (event: { target: { value: string } }) =>
      setForm((prev) => ({ ...prev, [key]: event.target.value }));

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Empêche les doubles envois et l'envoi si l'endpoint n'est pas configuré.
    if (status === "sending" || !configured) {
      return;
    }

    // Fige la hauteur actuelle du formulaire avant de basculer sur le succès.
    setLockedHeight(bodyRef.current?.offsetHeight);
    setStatus("sending");

    const payload = {
      nomPrenom: form.name,
      presence: form.attendance,
      adultes: form.adults,
      enfants: form.children,
      message: form.message,
      allergies: form.diet,
      dateEnvoi: new Date().toISOString(),
      userAgent: navigator.userAgent,
    };

    try {
      // Google Apps Script : requête « simple » (text/plain) + mode no-cors
      // pour éviter les blocages CORS. La réponse est opaque : on ne la lit pas.
      await fetch(rsvp.endpoint, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="rsvp" className="section-shell story-section story-section--rsvp" aria-labelledby="rsvp-title">
      <SectionDecor variant="rsvp" />
      <Particles count={27} seed={5} />
      <FloatingButterflies section="rsvp" />
      <SectionHeader eyebrow="Fiche d'expédition" title="Confirmer votre présence">
        <p>Merci de confirmer votre présence avant le {rsvp.deadline}.</p>
      </SectionHeader>

      <Reveal>
        <PaperCard className="rsvp-card mx-auto max-w-3xl p-6 sm:p-9" rotated="left">
          <div className="tape tape-top" aria-hidden="true" />
          <Stamp className="mb-5">Carnet — réponse</Stamp>

          <div className="rsvp-body" ref={bodyRef} style={lockedHeight ? { minHeight: lockedHeight } : undefined}>
          {status === "success" ? (
            <div className="rsvp-success" role="status">
              <span className="rsvp-success-mark" aria-hidden="true">
                <PartyPopper size={30} aria-hidden="true" />
              </span>
              <p className="rsvp-success-title">Merci, votre réponse a bien été envoyée.</p>
              <p className="rsvp-success-sub">Les parents recevront votre réponse directement.</p>
            </div>
          ) : (
            <form className="rsvp-form" onSubmit={handleSubmit} noValidate>
              <div className="rsvp-field rsvp-field--full">
                <label htmlFor="rsvp-name">Nom et prénom</label>
                <input
                  id="rsvp-name"
                  type="text"
                  required
                  autoComplete="name"
                  value={form.name}
                  onChange={update("name")}
                  placeholder="Famille Explorateur"
                />
              </div>

              <div className="rsvp-field rsvp-field--full">
                <span className="rsvp-legend">Présence</span>
                <div className="rsvp-radio-group" role="radiogroup" aria-label="Présence">
                  {["Présent(e)", "Absent(e)"].map((option) => (
                    <label key={option} className={`rsvp-radio ${form.attendance === option ? "is-active" : ""}`}>
                      <input
                        type="radio"
                        name="attendance"
                        value={option}
                        checked={form.attendance === option}
                        onChange={update("attendance")}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>

              <div className="rsvp-field">
                <label htmlFor="rsvp-adults">Nombre d'adultes</label>
                <input
                  id="rsvp-adults"
                  type="number"
                  min={0}
                  inputMode="numeric"
                  value={form.adults}
                  onChange={update("adults")}
                />
              </div>

              <div className="rsvp-field">
                <label htmlFor="rsvp-children">Nombre d'enfants</label>
                <input
                  id="rsvp-children"
                  type="number"
                  min={0}
                  inputMode="numeric"
                  value={form.children}
                  onChange={update("children")}
                />
              </div>

              <div className="rsvp-field rsvp-field--full">
                <label htmlFor="rsvp-diet">Allergies ou repas spécial (optionnel)</label>
                <input
                  id="rsvp-diet"
                  type="text"
                  value={form.diet}
                  onChange={update("diet")}
                  placeholder="Végétarien, sans gluten…"
                />
              </div>

              <div className="rsvp-field rsvp-field--full">
                <label htmlFor="rsvp-message">Message (optionnel)</label>
                <textarea
                  id="rsvp-message"
                  rows={3}
                  value={form.message}
                  onChange={update("message")}
                  placeholder="Un petit mot pour les parents…"
                />
              </div>

              {status === "error" ? (
                <p className="rsvp-feedback rsvp-feedback--error rsvp-field--full" role="alert">
                  Une erreur est survenue. Merci de réessayer dans quelques instants.
                </p>
              ) : null}

              <div className="rsvp-actions rsvp-field--full">
                <button type="submit" className="btn btn-primary" disabled={status === "sending" || !configured}>
                  <Send size={18} aria-hidden="true" />
                  {status === "sending" ? "Envoi en cours…" : "Envoyer ma réponse"}
                </button>
                <span className="rsvp-hint">
                  <CheckCircle2 size={14} aria-hidden="true" />
                  {configured
                    ? "Votre réponse est envoyée directement aux parents."
                    : "Service de confirmation non configuré."}
                </span>
              </div>
            </form>
          )}
          </div>
        </PaperCard>
      </Reveal>
    </section>
  );
};
