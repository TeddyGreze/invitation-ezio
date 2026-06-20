import type { ReactNode } from "react";
import { invitationConfig } from "../config/invitationConfig";

type LayoutProps = {
  children: ReactNode;
  /** Le chrome (skip-link + footer) n'apparaît qu'une fois l'intro terminée,
   *  pour éviter tout flash (« Papa & Maman ») derrière l'enveloppe. */
  ready?: boolean;
};

export const Layout = ({ children, ready = true }: LayoutProps) => (
  <div className="min-h-screen overflow-hidden bg-[var(--color-canvas)] text-ink">
    {ready ? (
      <a className="skip-link" href="#journal">
        Aller au contenu
      </a>
    ) : null}
    <main>{children}</main>
    {ready ? (
      <footer className="footer">
        <p>{invitationConfig.parentsNames}</p>
        <p>Journal d'explorateur pour le baptême d'{invitationConfig.babyName}.</p>
      </footer>
    ) : null}
  </div>
);
