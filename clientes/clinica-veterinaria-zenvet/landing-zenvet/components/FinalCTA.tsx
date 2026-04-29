import { sectionByName, WHATSAPP_LINK, ADDRESS, HOURS, PHONE_DISPLAY, INSTAGRAM, GMAPS_URL } from "@/lib/data";
import { MessageCircle, MapPin, Clock, Instagram } from "lucide-react";

export default function FinalCTA() {
  const s: any = sectionByName("final_cta");
  return (
    <section id="agendar" className="bg-purple-deep text-white relative overflow-hidden">
      <div className="container-content section relative z-10">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-5 !text-white leading-tight">
              {s.headline}
            </h2>
            <p className="text-lg md:text-xl text-white/85 leading-relaxed mb-6">
              {s.subheadline}
            </p>
            <div className="flex flex-wrap gap-3">
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener" className="btn-primary">
                <MessageCircle size={18} />
                {s.cta_primary}
              </a>
              <a href={GMAPS_URL} target="_blank" rel="noopener" className="inline-flex items-center justify-center gap-2 text-white font-semibold px-6 py-3 rounded-full border-2 border-white/40 hover:bg-white/10 transition">
                {s.cta_secondary}
              </a>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-card p-6 backdrop-blur-sm">
            <ul className="flex flex-col gap-4 text-sm md:text-base">
              <li className="flex gap-3">
                <MapPin size={18} className="text-turquoise flex-shrink-0 mt-0.5" />
                <span className="text-white/90">{ADDRESS}</span>
              </li>
              <li className="flex gap-3">
                <Clock size={18} className="text-turquoise flex-shrink-0 mt-0.5" />
                <span className="text-white/90">{HOURS}</span>
              </li>
              <li className="flex gap-3">
                <MessageCircle size={18} className="text-turquoise flex-shrink-0 mt-0.5" />
                <span className="text-white/90">WhatsApp · {PHONE_DISPLAY}</span>
              </li>
              <li className="flex gap-3">
                <Instagram size={18} className="text-turquoise flex-shrink-0 mt-0.5" />
                <a href={`https://instagram.com/${INSTAGRAM.replace("@", "")}`} target="_blank" rel="noopener" className="text-white/90 hover:underline">
                  {INSTAGRAM}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 right-0 w-64 h-64 md:w-96 md:h-96 rounded-full bg-magenta/20 blur-3xl pointer-events-none" />
      <div className="absolute top-0 left-0 w-48 h-48 md:w-64 md:h-64 rounded-full bg-turquoise/15 blur-3xl pointer-events-none" />
    </section>
  );
}
