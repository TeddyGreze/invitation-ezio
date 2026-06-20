import { motion } from "framer-motion";
import { Compass, MessageCircle, ScrollText } from "lucide-react";
import { invitationConfig } from "../config/invitationConfig";
import { buildParentMessage, createWhatsAppUrl, hasValidWhatsAppNumber } from "../utils/whatsapp";
import { DecorationImage, Stamp } from "./DecorativeElements";
import { FloatingButterflies } from "./FloatingButterflies";
import { Particles } from "./Particles";

type HeroSectionProps = {
  onToast: (message: string) => void;
};

const scrollToSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
};

export const HeroSection = ({ onToast }: HeroSectionProps) => {
  const handleParentMessage = () => {
    if (!hasValidWhatsAppNumber(invitationConfig.whatsappNumber)) {
      onToast("Numéro WhatsApp à compléter dans la configuration.");
      return;
    }

    window.open(
      createWhatsAppUrl(invitationConfig.whatsappNumber, buildParentMessage(invitationConfig)),
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <section className="hero-section" aria-labelledby="hero-title">
      <picture className="hero-picture">
        <source media="(max-width: 740px)" srcSet={invitationConfig.heroImageMobile} />
        <img
          src={invitationConfig.heroImage}
          alt=""
          className="hero-image"
          loading="eager"
          fetchPriority="high"
        />
      </picture>
      <div className="hero-overlay" />
      <Particles count={36} seed={1} />
      <FloatingButterflies section="hero" />
      <div className="hero-foreground" aria-hidden="true">
        <DecorationImage
          src={invitationConfig.heroForegroundAssets.leafLeft}
          className="hero-asset hero-asset--leaf-left"
        />
        <DecorationImage
          src={invitationConfig.heroForegroundAssets.leafTop}
          className="hero-asset hero-asset--leaf-top"
        />
        <DecorationImage
          src={invitationConfig.heroForegroundAssets.compass}
          className="hero-asset hero-asset--compass"
        />
      </div>

      <div className="hero-content relative z-10 mx-auto flex w-full max-w-6xl px-5 py-16 sm:px-8 lg:px-10">
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <Stamp>Carnet d'expédition n°{invitationConfig.expeditionNumber}</Stamp>
            <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(95,70,43,0.25)] bg-[rgba(255,248,232,0.72)] px-4 py-2 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-brown shadow-sm">
              <Compass size={16} aria-hidden="true" />
              Baptême
            </span>
          </div>

          <p className="eyebrow text-left">Journal d'explorateur</p>
          <h1 id="hero-title" className="hero-name">
            {invitationConfig.babyName}
          </h1>
          <p className="hero-subtitle">
            Petit explorateur depuis le {invitationConfig.birthDate}
          </p>
          <p className="hero-intro">
            Après plusieurs mois d'attente et une nouvelle merveille venue agrandir notre famille,
            notre petit aventurier {invitationConfig.babyName} s'apprête à vivre une nouvelle étape
            extraordinaire.
          </p>

          <div className="hero-actions">
            <button className="btn btn-primary" onClick={() => scrollToSection("journal")}>
              <ScrollText size={18} aria-hidden="true" />
              Découvrir l'invitation
            </button>
            <button className="btn btn-secondary" onClick={handleParentMessage}>
              <MessageCircle size={18} aria-hidden="true" />
              Envoyer un message aux parents
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
