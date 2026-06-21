import { motion, useAnimationControls, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import { Compass, Feather, Leaf, PawPrint } from "lucide-react";
import { invitationConfig } from "../config/invitationConfig";
import { Particles } from "./Particles";

type EnvelopeIntroProps = {
  /** Monte le contenu principal SOUS la scène encore opaque (début du fondu). */
  onReveal: () => void;
  /** Retire la scène une fois le fondu terminé. */
  onFinish: () => void;
};

/**
 * Machine à états de la scène d'ouverture :
 *  idle        → enveloppe fermée, au repos (flottement + hover)
 *  seal        → le sceau de cire se rompt et se détache
 *  flap        → le rabat supérieur pivote en 3D et révèle le liner
 *  reveal      → la carte glisse hors de l'enveloppe (ressort)
 *  transition  → léger zoom + fondu de la scène vers le hero
 *  opened      → terminé, le site est monté
 */
type Phase = "idle" | "seal" | "flap" | "reveal" | "transition" | "opened";

const ambientLeaves = [
  { className: "intro-leaf intro-leaf--1", size: 28, duration: 9 },
  { className: "intro-leaf intro-leaf--2", size: 21, duration: 11 },
  { className: "intro-leaf intro-leaf--3", size: 25, duration: 10.5 },
];

const sparks = Array.from({ length: 10 });

const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

export const EnvelopeIntro = ({ onReveal, onFinish }: EnvelopeIntroProps) => {
  const prefersReducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("idle");
  const lock = useRef(false);

  const root = useAnimationControls();
  const stage = useAnimationControls();
  const seal = useAnimationControls();
  const flap = useAnimationControls();
  const card = useAnimationControls();

  const runSequence = async () => {
    // Version simplifiée si l'utilisateur réduit les animations.
    if (prefersReducedMotion) {
      setPhase("transition");
      onReveal();
      await root.start({ opacity: 0, transition: { duration: 0.4 } });
      setPhase("opened");
      onFinish();
      return;
    }

    // Étape 1 — feedback tactile immédiat : la scène se comprime brièvement,
    // comme une pression sur du papier épais, pour confirmer l'interaction.
    await stage.start({
      scale: [1, 0.984, 1],
      transition: { duration: 0.32, ease: [0.34, 1.25, 0.64, 1], times: [0, 0.4, 1] },
    });

    // Étapes 2 & 3 — le sceau de cire gonfle, se rompt et se détache (déverrouillage).
    setPhase("seal");
    await seal.start({
      scale: [1, 1.18, 0.58],
      rotate: [0, -7, 20],
      y: [0, -4, 34],
      opacity: [1, 1, 0],
      transition: { duration: 0.64, ease: [0.34, 1.3, 0.64, 1], times: [0, 0.4, 1] },
    });

    // Étape 3 — ouverture physique du rabat en 3D (charnière haute). On ouvre
    // franchement (-166°) pour que le rabat se couche vers l'arrière : sans cela
    // la perspective le raccourcit et il paraît à peine entrouvert.
    setPhase("flap");
    const flapAnim = flap.start({
      rotateX: -166,
      transition: { duration: 1.1, ease: [0.46, 0.03, 0.18, 1] },
    });

    // Désynchronisation douce : la carte commence à se soulever AVANT la fin de
    // l'ouverture du rabat → mouvement organique, jamais mécanique.
    await wait(600);

    // Étapes 4 & 5 — la carte glisse hors de l'enveloppe avec une légère inertie.
    setPhase("reveal");
    const cardAnim = card.start({
      y: "-70%",
      scale: 1.06,
      transition: { type: "spring", stiffness: 58, damping: 15, mass: 1.1 },
    });

    await Promise.all([flapAnim, cardAnim]);

    // Étape 6 — le contenu se monte SOUS la scène encore opaque, puis la scène
    // fond (zoom + flou) pour révéler le hero. Aucun flash de l'arrière-plan.
    setPhase("transition");
    onReveal();
    await Promise.all([
      stage.start({
        scale: 1.16,
        transition: { duration: 0.9, ease: [0.5, 0, 0.2, 1] },
      }),
      root.start({
        opacity: 0,
        filter: "blur(10px)",
        transition: { duration: 0.72, ease: [0.5, 0, 0.2, 1], delay: 0.24 },
      }),
    ]);

    setPhase("opened");
    onFinish();
  };

  const handleOpen = () => {
    if (lock.current) {
      return;
    }
    lock.current = true;
    void runSequence();
  };

  return (
    <motion.div className={`intro-scene phase-${phase}`} style={{ opacity: 1 }} animate={root}>
      {/* Fond papier ancien + ambiance jungle très discrète */}
      <div className="intro-bg" aria-hidden="true" />
      <div className="intro-vignette" aria-hidden="true" />

      <div className="intro-decor" aria-hidden="true">
        <Compass className="intro-compass" size={560} strokeWidth={0.5} />
        <PawPrint className="intro-paw intro-paw--1" size={22} />
        <PawPrint className="intro-paw intro-paw--2" size={18} />
        {ambientLeaves.map((leaf) => (
          <motion.span
            key={leaf.className}
            className={leaf.className}
            animate={
              prefersReducedMotion
                ? undefined
                : { y: [0, -14, 0], rotate: [0, 7, 0], opacity: [0.45, 0.8, 0.45] }
            }
            transition={{ duration: leaf.duration, repeat: Infinity, ease: "easeInOut" }}
          >
            <Leaf size={leaf.size} />
          </motion.span>
        ))}
      </div>

      <Particles count={48} seed={9} />

      {!prefersReducedMotion ? <div className="intro-shine" aria-hidden="true" /> : null}

      <motion.div className="intro-stage" animate={stage}>
        <motion.div
          className="env-wrap"
          initial={prefersReducedMotion ? false : { y: 48, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          {/* Halo lumineux doux : donne à l'enveloppe une présence d'objet précieux */}
          <span className="env-glow" aria-hidden="true" />

          <motion.button
            type="button"
            className={`env phase-${phase}`}
            onClick={handleOpen}
            aria-label="Ouvrir l'invitation au baptême d'Ezio"
            whileHover={phase === "idle" && !prefersReducedMotion ? { y: -8, scale: 1.012 } : undefined}
            whileTap={phase === "idle" ? { scale: 0.99 } : undefined}
            animate={phase === "idle" && !prefersReducedMotion ? { y: [0, -7, 0] } : { y: 0 }}
            transition={
              phase === "idle" && !prefersReducedMotion
                ? { duration: 5.5, repeat: Infinity, ease: "easeInOut" }
                : { duration: 0.4 }
            }
          >
            {/* Ombre portée réaliste */}
            <span className="env-shadow" aria-hidden="true" />

            {/* Intérieur / dos de l'enveloppe */}
            <span className="env-back" aria-hidden="true" />

            {/* Carte intérieure (sort à l'ouverture) */}
            <motion.span className="env-card" animate={card} aria-hidden="true">
              <span className="env-card-frame">
                <span className="env-card-leaves">
                  <Leaf size={14} />
                  <Leaf size={18} />
                  <Leaf size={14} />
                </span>
                <span className="env-card-eyebrow">Vous êtes convié·e·s</span>
                <span className="env-card-title">Baptême</span>
                <span className="env-card-name">{invitationConfig.babyName}</span>
                <span className="env-card-date">
                  <Feather size={13} aria-hidden="true" />
                  {invitationConfig.baptismDate}
                </span>
              </span>
            </motion.span>

            {/* Rabats latéraux + bas : forment le corps fermé de l'enveloppe */}
            <span className="env-side env-side--left" aria-hidden="true" />
            <span className="env-side env-side--right" aria-hidden="true" />
            <span className="env-side env-side--bottom" aria-hidden="true" />

            {/* Petit timbre discret */}
            <span className="env-stamp" aria-hidden="true">
              <Compass size={16} aria-hidden="true" />
              <small>n°{invitationConfig.expeditionNumber}</small>
            </span>

            {/* Rabat supérieur 3D — une seule face parchemin (recto = verso),
                pivot sur la charnière du bord haut. */}
            <motion.span
              className="env-flap"
              animate={flap}
              style={{ transformOrigin: "top center" }}
              aria-hidden="true"
            >
              <span className="env-flap-face" />
            </motion.span>

            {/* Cachet de cire (ancre centrée, rupture animée par Framer) */}
            <span className="wax-seal-anchor" aria-hidden="true">
              <motion.span className="wax-seal" animate={seal}>
                <span className="wax-seal-ring" />
                <Compass size={22} aria-hidden="true" />
              </motion.span>
            </span>

            {/* Éclats dorés libérés à l'ouverture */}
            <span className="env-burst" aria-hidden="true">
              {sparks.map((_, index) => (
                <span key={index} className={`env-spark env-spark--${index + 1}`} />
              ))}
            </span>
          </motion.button>
        </motion.div>

        <motion.div
          className="intro-cta"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: phase === "idle" ? 1 : 0, y: phase === "idle" ? 0 : -10 }}
          transition={{ delay: phase === "idle" ? 0.55 : 0, duration: 0.5 }}
        >
          <span className="intro-eyebrow">Carnet d'expédition n°{invitationConfig.expeditionNumber}</span>
          <button type="button" className="intro-open-btn" onClick={handleOpen}>
            <span className="intro-open-btn-seal" aria-hidden="true">
              <Compass size={17} aria-hidden="true" />
            </span>
            Ouvrir l'invitation
          </button>
          <span className="intro-hint">Touchez l'enveloppe pour l'ouvrir</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
