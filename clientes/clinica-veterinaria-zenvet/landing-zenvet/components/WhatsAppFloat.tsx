import { WHATSAPP_LINK } from "@/lib/data";
import { MessageCircle } from "lucide-react";

export default function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener"
      aria-label="Agendar pelo WhatsApp"
      className="fixed bottom-5 right-5 md:bottom-7 md:right-7 z-50 inline-flex items-center gap-2 bg-[#25D366] text-white font-semibold px-4 py-3 md:px-5 md:py-4 rounded-full shadow-2xl hover:opacity-95 transition active:scale-95"
      style={{
        boxShadow:
          "0 10px 30px rgba(37,211,102,.45), 0 0 0 0 rgba(37,211,102,.5)",
        animation: "whatsPulse 2.4s ease-out infinite",
      }}
    >
      <MessageCircle size={22} className="md:size-6" />
      <span className="hidden sm:inline text-sm">WhatsApp</span>
    </a>
  );
}
