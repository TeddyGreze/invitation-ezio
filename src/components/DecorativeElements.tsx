import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { PawPrint } from "lucide-react";
import { invitationConfig } from "../config/invitationConfig";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export const Reveal = ({ children, className, delay = 0 }: RevealProps) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
};

type PaperCardProps = {
  children: ReactNode;
  className?: string;
  rotated?: "left" | "right";
};

export const PaperCard = ({ children, className = "", rotated }: PaperCardProps) => (
  <div className={`paper-card ${rotated ? `paper-card--${rotated}` : ""} ${className}`}>
    {children}
  </div>
);

type StampProps = {
  children: ReactNode;
  className?: string;
};

export const Stamp = ({ children, className = "" }: StampProps) => (
  <span className={`stamp ${className}`}>{children}</span>
);

type DecorationImageProps = {
  src: string;
  className?: string;
};

export const DecorationImage = ({ src, className = "" }: DecorationImageProps) => (
  <img
    src={src}
    alt=""
    aria-hidden="true"
    loading="lazy"
    decoding="async"
    className={`decor-image ${className}`}
  />
);

type SectionDecorProps = {
  variant: "journal" | "plan" | "program" | "note" | "rsvp" | "final";
};

export const SectionDecor = ({ variant }: SectionDecorProps) => {
  const illustration = invitationConfig.sectionIllustrations[variant];

  return (
    <div className={`section-decor section-decor--${variant}`} aria-hidden="true">
      <picture className="section-illustration-picture">
        <source media="(max-width: 740px)" srcSet={illustration.mobile} />
        <img
          src={illustration.desktop}
          alt=""
          loading="lazy"
          decoding="async"
          className="section-illustration"
        />
      </picture>
    </div>
  );
};

export const PawTrail = ({ className = "" }: { className?: string }) => (
  <div className={`paw-trail ${className}`} aria-hidden="true">
    {Array.from({ length: 8 }).map((_, index) => (
      <motion.span
        key={index}
        initial={{ opacity: 0, scale: 0.7 }}
        whileInView={{ opacity: 0.42, scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ delay: index * 0.12, duration: 0.35 }}
      >
        <PawPrint size={22} />
      </motion.span>
    ))}
  </div>
);

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
};

export const SectionHeader = ({ eyebrow, title, children }: SectionHeaderProps) => (
  <Reveal className="section-heading mx-auto mb-8 max-w-3xl text-center md:mb-12">
    {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
    <h2 className="section-title">{title}</h2>
    {children ? <div className="section-copy">{children}</div> : null}
  </Reveal>
);

type ToastProps = {
  message: string;
  open: boolean;
};

export const Toast = ({ message, open }: ToastProps) => (
  <AnimatePresence>
    {open ? (
      <motion.div
        role="status"
        aria-live="polite"
        className="toast"
        initial={{ opacity: 0, y: 22, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 18, scale: 0.96 }}
        transition={{ duration: 0.25 }}
      >
        {message}
      </motion.div>
    ) : null}
  </AnimatePresence>
);
