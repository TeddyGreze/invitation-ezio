const BUTTERFLY_SRC = "/assets/images/animals/butterfly.webp";

export type ButterflySection =
  | "hero"
  | "journal"
  | "plan"
  | "program"
  | "rsvp"
  | "note"
  | "final";

type Butterfly = {
  top: string;
  left: string;
  size: number; // rem
  opacity: number;
  delay: number;
  duration: number;
  flip: boolean;
  hideOnMobile: boolean;
};

const SEEDS: Record<ButterflySection, number> = {
  hero: 1,
  journal: 2,
  plan: 3,
  program: 4,
  rsvp: 5,
  note: 6,
  final: 7,
};

// Génération procédurale (déterministe via le seed) : positions, tailles,
// opacités, délais, durées et orientations variés pour un rendu naturel.
const makeButterflies = (count: number, seed: number): Butterfly[] =>
  Array.from({ length: count }, (_, i) => {
    // Hash sinus → placements bien dispersés (pas d'alignement ni de cluster).
    const rand = (min: number, max: number, salt: number) => {
      const x = Math.sin((i + 1) * 12.9898 + salt * 78.233 + seed * 37.719) * 43758.5453;
      return min + (x - Math.floor(x)) * (max - min);
    };

    return {
      top: `${rand(6, 84, 1).toFixed(1)}%`,
      left: `${rand(4, 90, 2).toFixed(1)}%`,
      size: Number(rand(2.1, 3.6, 3).toFixed(2)),
      opacity: Number(rand(0.3, 0.52, 4).toFixed(2)),
      delay: Number(rand(0, 6, 5).toFixed(1)),
      duration: Number(rand(10, 16, 6).toFixed(1)),
      flip: rand(0, 1, 7) > 0.5,
      // on garde environ 1/3 des papillons sur mobile
      hideOnMobile: rand(0, 1, 8) > 0.34,
    };
  });

export const FloatingButterflies = ({
  section,
  count = 12,
}: {
  section: ButterflySection;
  count?: number;
}) => {
  const butterflies = makeButterflies(count, SEEDS[section]);

  return (
    <div className="butterflies" aria-hidden="true">
      {butterflies.map((b, index) => (
        <span
          key={index}
          className={`butterfly${b.flip ? " butterfly--flip" : ""}${b.hideOnMobile ? " butterfly--desktop" : ""}`}
          style={{
            top: b.top,
            left: b.left,
            width: `${b.size}rem`,
            opacity: b.opacity,
            animationDelay: `${b.delay}s`,
            animationDuration: `${b.duration}s`,
          }}
        >
          <img src={BUTTERFLY_SRC} alt="" loading="lazy" decoding="async" />
        </span>
      ))}
    </div>
  );
};
