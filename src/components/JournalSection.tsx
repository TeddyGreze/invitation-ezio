import { Droplet, Heart, Map, PawPrint, Sparkles, Users } from "lucide-react";
import { invitationConfig } from "../config/invitationConfig";
import {
  PaperCard,
  Reveal,
  SectionDecor,
  SectionHeader,
  Stamp,
} from "./DecorativeElements";
import { FloatingButterflies } from "./FloatingButterflies";
import { Particles } from "./Particles";

export const JournalSection = () => (
  <section id="journal" className="section-shell story-section story-section--journal" aria-labelledby="journal-title">
    <SectionDecor variant="journal" />
    <Particles count={30} seed={2} />
    <FloatingButterflies section="journal" />
    <SectionHeader eyebrow="Page de carnet" title="Journal de bord">
      <p>Une invitation douce, pensée comme une page tournée dans le grand carnet familial.</p>
    </SectionHeader>

    <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.05fr_0.95fr]">
      <Reveal>
        <PaperCard className="relative min-h-full overflow-hidden p-7 sm:p-10">
          <div className="map-watermark" aria-hidden="true">
            <Map size={220} strokeWidth={0.8} />
          </div>
          <Stamp className="mb-7">Aventure exceptionnelle</Stamp>
          <h3 id="journal-title" className="card-title">
            Dans la jungle de la vie
          </h3>
          <p className="journal-text">
            Dans la jungle de la vie, l'amour est notre plus belle boussole.
            <br />
            Nous avons l'immense joie de vous inviter à célébrer le baptême de notre petit{" "}
            {invitationConfig.babyName}.
          </p>
          <div className="divider-line">
            <Heart size={18} fill="currentColor" aria-hidden="true" />
          </div>
          <div className="animal-strip" aria-hidden="true">
            <span>lionceau</span>
            <PawPrint size={18} />
            <span>éléphant</span>
            <PawPrint size={18} />
            <span>girafe</span>
          </div>
        </PaperCard>
      </Reveal>

      <Reveal delay={0.12}>
        <PaperCard className="journal-step relative min-h-full p-7 sm:p-9" rotated="right">
          <div className="tape tape-top" aria-hidden="true" />
          <Stamp className="mb-6">Une étape précieuse</Stamp>
          <h3 className="card-title">Une nouvelle étape</h3>
          <p className="journal-text">
            {invitationConfig.babyName} s'apprête à vivre un moment précieux, entouré de sa famille et
            de ceux qui comptent pour lui.
          </p>
          <div className="divider-line">
            <Sparkles size={18} aria-hidden="true" />
          </div>
          <div className="journal-badges">
            <span className="journal-badge">
              <Users size={15} aria-hidden="true" />
              Famille
            </span>
            <span className="journal-badge">
              <Heart size={15} fill="currentColor" aria-hidden="true" />
              Amour
            </span>
            <span className="journal-badge">
              <Droplet size={15} aria-hidden="true" />
              Baptême
            </span>
          </div>
        </PaperCard>
      </Reveal>
    </div>
  </section>
);
