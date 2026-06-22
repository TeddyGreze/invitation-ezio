import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Musique d'ambiance — démarre UNIQUEMENT sur geste utilisateur (ouverture de
 * l'enveloppe), jamais en autoplay au chargement.
 *
 * Volume / fondu gérés via la Web Audio API (GainNode) : c'est le seul moyen
 * fiable de contrôler le volume sur iOS Safari, où `HTMLAudioElement.volume`
 * est ignoré. Si la Web Audio API n'est pas disponible, on retombe proprement
 * sur `audio.volume`. Aucune dépendance externe.
 */

const SRC = "/audio/musique-invitationV2.mp3";
const TARGET_VOLUME = 0.24; // doux (plage demandée 0.18–0.30)
const FADE_IN_SECONDS = 2.4;
const FADE_OUT_SECONDS = 0.5;

type WindowWithWebkitAudio = Window & {
  webkitAudioContext?: typeof AudioContext;
};

export function useBackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const startedRef = useRef(false);
  const pauseTimerRef = useRef<number | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);

  // Élément audio créé une seule fois, préchargé léger (metadata) — aucun coût
  // de bande passante au chargement initial tant que la lecture n'est pas lancée.
  useEffect(() => {
    const audio = new Audio(SRC);
    audio.loop = true;
    audio.preload = "metadata";
    audioRef.current = audio;

    return () => {
      if (pauseTimerRef.current !== null) {
        window.clearInterval(pauseTimerRef.current);
      }
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
      audioRef.current = null;
      if (ctxRef.current) {
        void ctxRef.current.close().catch(() => undefined);
        ctxRef.current = null;
      }
      gainRef.current = null;
    };
  }, []);

  // Construit le graphe Web Audio (source → gain → sortie) à la demande, dans le
  // geste utilisateur. createMediaElementSource ne peut être appelé qu'une fois.
  const ensureGraph = useCallback(() => {
    if (ctxRef.current || !audioRef.current) {
      return;
    }
    try {
      const Ctx = window.AudioContext || (window as WindowWithWebkitAudio).webkitAudioContext;
      if (!Ctx) {
        return;
      }
      const ctx = new Ctx();
      const source = ctx.createMediaElementSource(audioRef.current);
      const gain = ctx.createGain();
      gain.gain.value = 0;
      source.connect(gain).connect(ctx.destination);
      ctxRef.current = ctx;
      gainRef.current = gain;
    } catch {
      // Web Audio indisponible → fallback sur audio.volume (cf. rampTo).
      ctxRef.current = null;
      gainRef.current = null;
    }
  }, []);

  const rampTo = useCallback((target: number, seconds: number) => {
    const ctx = ctxRef.current;
    const gain = gainRef.current;
    if (ctx && gain) {
      const now = ctx.currentTime;
      gain.gain.cancelScheduledValues(now);
      gain.gain.setValueAtTime(gain.gain.value, now);
      gain.gain.linearRampToValueAtTime(target, now + seconds);
      return;
    }
    // Fallback sans Web Audio (desktop/Android) : volume direct, sans fondu fin.
    if (audioRef.current) {
      audioRef.current.volume = target;
    }
  }, []);

  const cancelPendingPause = () => {
    if (pauseTimerRef.current !== null) {
      window.clearTimeout(pauseTimerRef.current);
      pauseTimerRef.current = null;
    }
  };

  const safePlay = useCallback(
    (onSuccess: () => void) => {
      const audio = audioRef.current;
      if (!audio) {
        return;
      }
      void ctxRef.current?.resume().catch(() => undefined);
      const result = audio.play();
      if (result && typeof result.then === "function") {
        result.then(onSuccess).catch(() => {
          // Lecture refusée/échouée : on ne plante pas, l'invitation continue.
          setIsPlaying(false);
        });
      } else {
        onSuccess();
      }
    },
    [],
  );

  /** Démarre la musique (à appeler dans le geste d'ouverture de l'enveloppe). */
  const start = useCallback(() => {
    if (startedRef.current) {
      return;
    }
    startedRef.current = true;
    ensureGraph();
    cancelPendingPause();
    safePlay(() => {
      setIsPlaying(true);
      rampTo(TARGET_VOLUME, FADE_IN_SECONDS);
    });
  }, [ensureGraph, safePlay, rampTo]);

  /** Bouton on/off : fond la musique puis met en pause, ou la relance en fondu. */
  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }
    ensureGraph();

    if (isPlaying) {
      rampTo(0, FADE_OUT_SECONDS);
      cancelPendingPause();
      pauseTimerRef.current = window.setTimeout(() => {
        audio.pause();
        pauseTimerRef.current = null;
      }, FADE_OUT_SECONDS * 1000 + 40);
      setIsPlaying(false);
      return;
    }

    cancelPendingPause();
    safePlay(() => {
      setIsPlaying(true);
      rampTo(TARGET_VOLUME, 1.2);
    });
  }, [ensureGraph, isPlaying, rampTo, safePlay]);

  return { start, toggle, isPlaying };
}
