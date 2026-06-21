import { invitationConfig } from "../config/invitationConfig";
import { PaperCard, Reveal, SectionDecor, SectionHeader } from "./DecorativeElements";
import { FloatingButterflies } from "./FloatingButterflies";
import { Particles } from "./Particles";

export const NoteCard = () => (
  <section className="section-shell story-section story-section--note" aria-labelledby="note-title">
    <SectionDecor variant="note" />
    <Particles count={30} seed={6} />
    <FloatingButterflies section="note" />
    <SectionHeader eyebrow="Petit mot" title="Un mot pour l'aventure" />
    <Reveal>
      <PaperCard className="note-card mx-auto max-w-3xl p-8 text-center sm:p-11" rotated="left">
        <div className="tape tape-top" aria-hidden="true" />
        <h2 id="note-title" className="card-title">
          Notes d'exploration
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-xl leading-9 text-ink/80">
          Merci d'être avec nous dans cette belle aventure.
          <br />
          Votre présence sera le plus beau trésor pour accompagner {invitationConfig.babyName} dans
          son premier sacrement.
        </p>
        <p className="mt-8 font-script text-5xl text-brown">{invitationConfig.parentsNames}</p>
      </PaperCard>
    </Reveal>
  </section>
);
