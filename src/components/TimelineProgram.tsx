import { Camera, Gift, Sparkles, UtensilsCrossed } from "lucide-react";
import { motion } from "framer-motion";
import { invitationConfig } from "../config/invitationConfig";
import { PaperCard, PawTrail, Reveal, SectionDecor, SectionHeader, Stamp } from "./DecorativeElements";
import { FloatingButterflies } from "./FloatingButterflies";
import { Particles } from "./Particles";

const steps = [
  {
    icon: Sparkles,
    title: "La cérémonie",
    text: "Un moment tendre et solennel pour entourer Ezio d'amour.",
  },
  {
    icon: Camera,
    title: "Moments en famille",
    text: "Des instants précieux à partager autour de cette nouvelle étape.",
  },
  {
    icon: UtensilsCrossed,
    title: "Repas / célébration",
    text: "Une escale conviviale pour partager sourires et douceurs.",
  },
  {
    icon: Gift,
    title: "Souvenirs et surprises",
    text: "De petites attentions pour garder une trace de cette aventure.",
  },
];

export const TimelineProgram = () => (
  <section className="section-shell story-section story-section--program" aria-labelledby="program-title">
    <SectionDecor variant="program" />
    <Particles count={30} seed={4} />
    <FloatingButterflies section="program" />
    <SectionHeader eyebrow="Chemin d'exploration" title="Le programme">
      <p>Une journée pensée pour partager ensemble les moments importants du baptême d'{invitationConfig.babyName}.</p>
    </SectionHeader>

    <div className="program-layout">
      <div className="timeline-wrap">
        <PawTrail className="hidden md:flex" />
        <div className="timeline-line" aria-hidden="true" />
        {steps.map(({ icon: Icon, title, text }, index) => (
          <Reveal key={title} delay={index * 0.06}>
            <motion.article
              className="timeline-step"
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 240, damping: 20 }}
            >
              <div className="timeline-marker">
                <Icon size={22} aria-hidden="true" />
              </div>
              <div>
                <p className="timeline-index">Étape {index + 1}</p>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </motion.article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.12}>
        <PaperCard className="program-souvenir p-5 sm:p-6" rotated="right">
          <div className="tape tape-top" aria-hidden="true" />
          <div className="program-souvenir-mark" aria-hidden="true">
            <Sparkles size={34} />
          </div>
          <Stamp>Parcours familial</Stamp>
          <p>
            Une journée imaginée comme une petite expédition tendre, avec des escales pour les
            souvenirs, les sourires et les surprises.
          </p>
        </PaperCard>
      </Reveal>
    </div>
  </section>
);
