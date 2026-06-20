import { useCallback, useEffect, useState } from "react";
import { Layout } from "./components/Layout";
import { EnvelopeIntro } from "./components/EnvelopeIntro";
import { HeroSection } from "./components/HeroSection";
import { JournalSection } from "./components/JournalSection";
import { ExpeditionPlan } from "./components/ExpeditionPlan";
import { TimelineProgram } from "./components/TimelineProgram";
import { NoteCard } from "./components/NoteCard";
import { RSVPForm } from "./components/RSVPForm";
import { PaperCard, SectionDecor, Stamp, Toast } from "./components/DecorativeElements";
import { FloatingButterflies } from "./components/FloatingButterflies";
import { Particles } from "./components/Particles";
import { ShareButtons } from "./components/ShareButtons";
import { invitationConfig } from "./config/invitationConfig";

export default function App() {
  // `revealed` monte le contenu (sous l'intro) ; `introMounted` garde l'intro à l'écran.
  const [revealed, setRevealed] = useState(false);
  const [introMounted, setIntroMounted] = useState(true);
  const [toast, setToast] = useState("");

  const showToast = useCallback((message: string) => {
    setToast(message);
  }, []);

  useEffect(() => {
    if (!toast) {
      return;
    }

    const timeout = window.setTimeout(() => setToast(""), 3600);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  // Tant que l'intro couvre l'écran : scroll bloqué et remis en haut.
  useEffect(() => {
    if (introMounted) {
      window.scrollTo(0, 0);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [introMounted]);

  return (
    <Layout ready={revealed}>
      {introMounted ? (
        <EnvelopeIntro
          key="envelope"
          onReveal={() => {
            window.scrollTo(0, 0);
            setRevealed(true);
          }}
          onFinish={() => setIntroMounted(false)}
        />
      ) : null}

      {revealed ? (
        <>
          <HeroSection onToast={showToast} />
          <JournalSection />
          <ExpeditionPlan />
          <TimelineProgram />
          <NoteCard />
          <RSVPForm />

          <section className="final-section story-section story-section--final" aria-labelledby="final-title">
            <SectionDecor variant="final" />
            <Particles count={30} seed={7} />
            <FloatingButterflies section="final" />
            <PaperCard className="relative z-10 mx-auto max-w-5xl p-7 text-center sm:p-10 lg:p-12">
              <Stamp className="mx-auto mb-6">Expédition de l'amour</Stamp>
              <h2 id="final-title" className="section-title">
                Au plaisir de partager cette belle expédition avec vous.
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-ink/75">
                Le carnet reste ouvert pour accueillir vos mots, vos sourires et vos souvenirs autour
                du baptême d'{invitationConfig.babyName}.
              </p>
              <p className="creole-closing">{invitationConfig.creoleClosing}</p>
              <ShareButtons onToast={showToast} />
            </PaperCard>
          </section>
        </>
      ) : null}

      <Toast message={toast} open={Boolean(toast)} />
    </Layout>
  );
}
