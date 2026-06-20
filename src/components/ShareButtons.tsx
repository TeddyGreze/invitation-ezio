import { MessageCircle } from "lucide-react";
import { invitationConfig } from "../config/invitationConfig";
import { buildParentMessage, createWhatsAppUrl, hasValidWhatsAppNumber } from "../utils/whatsapp";
import { CalendarButton } from "./CalendarButton";

type ShareButtonsProps = {
  onToast: (message: string) => void;
};

export const ShareButtons = ({ onToast }: ShareButtonsProps) => {
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
    <div className="share-actions">
      <button className="btn btn-primary" type="button" onClick={handleParentMessage}>
        <MessageCircle size={18} aria-hidden="true" />
        Envoyer un message aux parents
      </button>
      <CalendarButton onToast={onToast} />
    </div>
  );
};
