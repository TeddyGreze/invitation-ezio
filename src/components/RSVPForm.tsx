import { useRef, useState, type FormEvent } from "react";
import { PartyPopper, Send } from "lucide-react";
import { invitationConfig } from "../config/invitationConfig";
import { PaperCard, Reveal, SectionDecor, SectionHeader, Stamp } from "./DecorativeElements";
import { FloatingButterflies } from "./FloatingButterflies";
import { Particles } from "./Particles";

type RsvpFormData = {
  name: string;
  attendance: string;
  adults: string;
  children: string;
};

type Status = "idle" | "sending" | "success" | "error";

const ATTENDANCE_OPTIONS = ["Je serai présent(e)", "Je ne serai pas présent(e)"] as const;

const initialForm: RsvpFormData = {
  name: "",
  attendance: ATTENDANCE_OPTIONS[0],
  adults: "2",
  children: "0",
};

export const RSVPForm = () => {
  const { rsvp } = invitationConfig;
  const [form, setForm] = useState<RsvpFormData>(initialForm);
  const [status, setStatus] = useState<Status>("idle");
  // Erreur de validation du champ « Nom et prénom » (obligatoire).
  const [nameError, setNameError] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
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

    // Validation : le nom et prénom est obligatoire (vide ou espaces seuls = invalide).
    if (!form.name.trim()) {
      setNameError(true);
      nameRef.current?.focus();
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
                  ref={nameRef}
                  id="rsvp-name"
                  type="text"
                  required
                  autoComplete="name"
                  className={nameError ? "is-invalid" : undefined}
                  aria-invalid={nameError}
                  aria-describedby={nameError ? "rsvp-name-error" : undefined}
                  value={form.name}
                  onChange={(event) => {
                    update("name")(event);
                    // L'erreur disparaît dès que l'utilisateur recommence à saisir.
                    if (nameError) setNameError(false);
                  }}
                  placeholder="Famille Explorateur"
                />
                {nameError ? (
                  <span id="rsvp-name-error" className="rsvp-field-error" role="alert">
                    Merci d'indiquer votre nom et prénom avant d'envoyer votre réponse.
                  </span>
                ) : null}
              </div>

              <div className="rsvp-field rsvp-field--full">
                <span className="rsvp-legend">Présence</span>
                <div className="rsvp-radio-group" role="radiogroup" aria-label="Présence">
                  {ATTENDANCE_OPTIONS.map((option) => (
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
              </div>
            </form>
          )}
          </div>
        </PaperCard>
      </Reveal>
    </section>
  );
};
