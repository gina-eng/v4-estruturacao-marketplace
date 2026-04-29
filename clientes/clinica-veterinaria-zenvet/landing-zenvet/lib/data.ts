// Dados centralizados — refletem ee-s3-landing-page.json
// (lp-data.json é symlink para ../../outputs/ee-s3-landing-page.json
//  para Next.js conseguir importar dentro do project root)
import lp from "./lp-data.json";

export const WHATSAPP_LINK = lp.whatsapp_link;
export const META = lp.meta;
export const SECTIONS = lp.sections;
export const FAQ = lp.faq;
export const SOCIAL_PROOF = lp.social_proof;

export const sectionByName = (name: string) =>
  SECTIONS.find((s: any) => s.name === name);

export const ADDRESS = "Av. Pascoal Ardito, 792 — São Manoel, Americana-SP";
export const HOURS = "Seg a Sex · 8h às 18h";
export const PHONE_DISPLAY = "(19) 99579-5483";
export const INSTAGRAM = "@clinicazenvet";
export const GMAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Av.+Pascoal+Ardito+792+Americana+SP";
