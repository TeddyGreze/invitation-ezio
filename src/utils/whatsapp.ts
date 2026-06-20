import type { InvitationConfig } from "../config/invitationConfig";

export const isPlaceholderValue = (value?: string) =>
  !value || /à compléter|a completer|bient[oô]t/i.test(value.trim());

export const hasValidWhatsAppNumber = (phone?: string) =>
  Boolean(phone && !isPlaceholderValue(phone) && phone.replace(/[^\d]/g, "").length >= 8);

export const createWhatsAppUrl = (phone: string, message: string) => {
  const cleanPhone = phone.replace(/[^\d]/g, "");

  if (!cleanPhone) {
    return "";
  }

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
};

export const buildParentMessage = (config: InvitationConfig) =>
  `Bonjour, nous avons bien reçu l'invitation pour le baptême d'${config.babyName}. Nous vous contactons au sujet de notre présence.`;
