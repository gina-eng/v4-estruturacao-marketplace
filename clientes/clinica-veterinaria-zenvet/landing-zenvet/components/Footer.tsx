import { ADDRESS, INSTAGRAM, PHONE_DISPLAY } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="bg-graphite text-white/70 py-10 px-6">
      <div className="container-content flex flex-col md:flex-row gap-4 justify-between items-start md:items-center text-sm">
        <div>
          <div className="font-serif font-bold text-white text-xl tracking-tight">Zenvet</div>
          <div className="text-xs mt-1">Clínica veterinária especialista em felinos · Americana SP</div>
        </div>
        <div className="text-xs flex flex-col md:items-end gap-1">
          <span>{ADDRESS}</span>
          <span>WhatsApp {PHONE_DISPLAY} · IG {INSTAGRAM}</span>
          <span className="opacity-50 mt-2">© Zenvet 2026 — todos os direitos reservados.</span>
        </div>
      </div>
    </footer>
  );
}
