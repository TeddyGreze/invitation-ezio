import { CalendarDays, CheckCircle2, Clock, MapPin, PartyPopper, Shirt, Sparkles } from "lucide-react";
import { invitationConfig } from "../config/invitationConfig";
import { isPlaceholderValue } from "../utils/whatsapp";
import { Countdown } from "./Countdown";
import { PaperCard, Reveal, SectionDecor, SectionHeader, Stamp } from "./DecorativeElements";
import { FloatingButterflies } from "./FloatingButterflies";
import { Particles } from "./Particles";

const planItems = [
  {
    icon: CalendarDays,
    label: "Date du baptême",
    value: invitationConfig.baptismDate,
  },
  {
    icon: Clock,
    label: "Heure",
    value: invitationConfig.ceremonyTime,
  },
  {
    icon: Sparkles,
    label: "Lieu de la cérémonie",
    value: invitationConfig.ceremonyLocation,
  },
  {
    icon: MapPin,
    label: "Adresse",
    value: invitationConfig.ceremonyAddress,
    href: invitationConfig.ceremonyMapsUrl,
    hint: "Voir l'itinéraire",
  },
  {
    icon: PartyPopper,
    label: "Célébration / repas",
    value: invitationConfig.celebrationLocation,
    note: invitationConfig.celebrationNote,
  },
  {
    icon: Shirt,
    label: "Dress code",
    value: invitationConfig.dressCode,
  },
] as const;

export const ExpeditionPlan = () => (
  <section className="section-shell section-shell--soft story-section story-section--plan" aria-labelledby="expedition-title">
    <SectionDecor variant="plan" />
    <Particles count={30} seed={3} />
    <FloatingButterflies section="plan" />
    <SectionHeader eyebrow="Plan d'expédition" title="Rendez-vous pour une belle expédition">
      <p>Les repères essentiels seront mis à jour depuis le fichier de configuration.</p>
    </SectionHeader>

    <Reveal>
      <PaperCard className="mx-auto max-w-6xl p-6 sm:p-9 lg:p-11">
        <div className="mb-8 flex flex-col justify-between gap-5 border-b border-brown/15 pb-7 md:flex-row md:items-end">
          <div>
            <Stamp>Étape 1 : Le baptême</Stamp>
            <h3 id="expedition-title" className="card-title mt-4">
              Plan d'expédition
            </h3>
          </div>
          <Stamp className="self-start md:self-auto">Étape 2 : La célébration</Stamp>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {planItems.map((item) => {
            const { icon: Icon, label, value } = item;
            const href = "href" in item ? item.href : undefined;
            const hint = "hint" in item ? item.hint : undefined;
            const note = "note" in item ? item.note : undefined;
            const placeholder = isPlaceholderValue(value);

            return (
              <div className="info-tile" key={label}>
                <div className="info-icon">
                  <Icon size={22} aria-hidden="true" />
                </div>
                <div>
                  <p>{label}</p>
                  <strong className={placeholder ? "text-brown/55" : ""}>{value}</strong>
                  {note ? <span className="info-note">{note}</span> : null}
                  {href ? (
                    <a
                      className="info-maps-link"
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MapPin size={14} aria-hidden="true" />
                      {hint}
                    </a>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
        <div className="plan-note-grid">
          <div className="plan-confirmation">
            <div className="plan-note-icon">
              <CheckCircle2 size={20} aria-hidden="true" />
            </div>
            <div>
              <p>Confirmation</p>
              <strong>
                Merci de confirmer votre présence avant le {invitationConfig.confirmationDeadline}.
              </strong>
            </div>
          </div>
        </div>
        <div className="plan-route" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
      </PaperCard>
    </Reveal>

    <Reveal delay={0.1}>
      <Countdown />
    </Reveal>
  </section>
);
