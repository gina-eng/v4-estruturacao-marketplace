import { ADDRESS, GMAPS_URL, HOURS, PHONE_DISPLAY } from "@/lib/data";
import { MapPin, Clock, MessageCircle, ExternalLink } from "lucide-react";

const EMBED_URL =
  "https://www.google.com/maps?q=Av.+Pascoal+Ardito,+792,+Americana+SP&output=embed";

export default function LocationMap() {
  return (
    <section id="localizacao" className="bg-beige">
      <div className="container-content section">
        <header className="max-w-3xl mb-8">
          <div className="text-[11px] uppercase tracking-[0.15em] font-semibold text-turquoise-dark mb-3">
            · Como chegar
          </div>
          <h2 className="text-3xl md:text-[42px] font-serif font-medium leading-[1.05] tracking-tight">
            Estamos esperando você e seu gato{" "}
            <em className="italic font-normal">em Americana.</em>
          </h2>
        </header>

        <div className="grid md:grid-cols-[1.3fr_1fr] gap-6 items-stretch">
          <div className="rounded-card overflow-hidden border border-purple-deep/10 shadow-md aspect-[16/10] md:aspect-auto md:min-h-[380px]">
            <iframe
              title="Localização da Clínica Zenvet no Google Maps"
              src={EMBED_URL}
              width="100%"
              height="100%"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ border: 0, display: "block" }}
              allowFullScreen
            />
          </div>

          <div className="bg-white border border-purple-deep/10 rounded-card p-6 md:p-7 flex flex-col gap-4">
            <ul className="flex flex-col gap-4 text-[14px]">
              <li className="flex gap-3">
                <MapPin size={18} className="text-purple-deep flex-shrink-0 mt-0.5" />
                <span className="text-graphite/85 leading-relaxed">{ADDRESS}</span>
              </li>
              <li className="flex gap-3">
                <Clock size={18} className="text-purple-deep flex-shrink-0 mt-0.5" />
                <span className="text-graphite/85 leading-relaxed">{HOURS}</span>
              </li>
              <li className="flex gap-3">
                <MessageCircle size={18} className="text-purple-deep flex-shrink-0 mt-0.5" />
                <span className="text-graphite/85 leading-relaxed">
                  WhatsApp · {PHONE_DISPLAY}
                </span>
              </li>
            </ul>
            <a
              href={GMAPS_URL}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center justify-center gap-2 bg-purple-deep text-white font-semibold px-5 py-3 rounded-full hover:opacity-90 transition mt-auto"
            >
              Abrir no Google Maps
              <ExternalLink size={15} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
