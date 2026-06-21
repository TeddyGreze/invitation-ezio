import { Volume2, VolumeX } from "lucide-react";

type MusicToggleProps = {
  isPlaying: boolean;
  onToggle: () => void;
};

export const MusicToggle = ({ isPlaying, onToggle }: MusicToggleProps) => (
  <button
    type="button"
    className={`music-toggle ${isPlaying ? "is-on" : "is-off"}`}
    onClick={onToggle}
    aria-pressed={isPlaying}
    aria-label={isPlaying ? "Couper la musique" : "Activer la musique"}
    title={isPlaying ? "Couper la musique" : "Activer la musique"}
  >
    <span className="music-toggle-icon" aria-hidden="true">
      {isPlaying ? <Volume2 size={17} /> : <VolumeX size={17} />}
    </span>
    <span className="music-toggle-label">{isPlaying ? "Musique" : "Activer"}</span>
  </button>
);
