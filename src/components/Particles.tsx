import { useMemo, type CSSProperties } from "react";

type Particle = {
  top: string;
  left: string;
  size: number; // px
  opacity: number;
  dx: number; // px de dérive horizontale
  dy: number; // px de dérive verticale
  delay: number; // s
  duration: number; // s
  hideOnMobile: boolean;
};

// Génère des particules pseudo-aléatoires (déterministes via le seed) :
// positions, tailles, dérives, délais et durées tous variés.
const makeParticles = (count: number, seed: number): Particle[] =>
  Array.from({ length: count }, (_, i) => {
    // Hash sinus → valeurs bien dispersées (pas d'alignement ni de regroupement).
    const rand = (min: number, max: number, salt: number) => {
      const x = Math.sin((i + 1) * 12.9898 + salt * 78.233 + seed * 37.719) * 43758.5453;
      return min + (x - Math.floor(x)) * (max - min);
    };

    return {
      top: `${rand(3, 95, 1).toFixed(1)}%`,
      left: `${rand(3, 95, 2).toFixed(1)}%`,
      size: Number(rand(4, 9, 3).toFixed(1)),
      opacity: Number(rand(0.4, 0.7, 4).toFixed(2)),
      dx: Math.round(rand(-34, 34, 5)),
      dy: Math.round(rand(-50, -16, 6)),
      delay: Number(rand(0, 7, 7).toFixed(1)),
      duration: Number(rand(8, 16, 8).toFixed(1)),
      hideOnMobile: rand(0, 1, 9) > 0.5,
    };
  });

export const Particles = ({ count = 18, seed = 0 }: { count?: number; seed?: number }) => {
  const particles = useMemo(() => makeParticles(count, seed), [count, seed]);

  return (
    <div className="particles" aria-hidden="true">
      {particles.map((p, index) => (
        <span
          key={index}
          className={`particle${p.hideOnMobile ? " particle--desktop" : ""}`}
          style={
            {
              top: p.top,
              left: p.left,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              "--po": p.opacity,
              "--px": `${p.dx}px`,
              "--py": `${p.dy}px`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
};
