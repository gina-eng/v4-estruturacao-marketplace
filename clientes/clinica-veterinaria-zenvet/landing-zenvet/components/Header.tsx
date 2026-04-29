"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { WHATSAPP_LINK } from "@/lib/data";
import { ArrowRight } from "lucide-react";

const NAV = [
  { label: "A clínica", href: "#problem" },
  { label: "Dra. Nathalia", href: "#dra-nathalia" },
  { label: "Como atendemos", href: "#how-it-works" },
  { label: "FAQ", href: "#faq" },
];

const DARK_SECTIONS = new Set(["dra-nathalia", "agendar"]);

const SHOW_AFTER_PX = 180;

export default function Header() {
  const [visible, setVisible] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const handle = () => {
      setVisible(window.scrollY > SHOW_AFTER_PX);

      const sections = document.querySelectorAll<HTMLElement>("section[id]");
      let activeId = "";
      for (const sec of Array.from(sections)) {
        const rect = sec.getBoundingClientRect();
        if (rect.top <= 80 && rect.bottom > 80) {
          activeId = sec.id;
          break;
        }
      }
      setIsDark(DARK_SECTIONS.has(activeId));
    };
    handle();
    window.addEventListener("scroll", handle, { passive: true });
    window.addEventListener("resize", handle);
    return () => {
      window.removeEventListener("scroll", handle);
      window.removeEventListener("resize", handle);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 backdrop-blur-md border-b transition-all duration-300 ${
        visible
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "-translate-y-full opacity-0 pointer-events-none"
      } ${
        isDark
          ? "bg-purple-deep/90 border-white/10"
          : "bg-beige/90 border-purple-deep/10"
      }`}
    >
      <div className="container-content flex items-center justify-between gap-6 px-6 py-3 md:py-4">
        <a href="#" aria-label="Zenvet — início" className="flex items-center">
          <Image
            src={
              isDark
                ? "/logo/zenvet_horizontal_white.svg"
                : "/logo/zenvet_horizontal.svg"
            }
            alt="Zenvet"
            width={1138}
            height={363}
            priority
            className="h-8 md:h-9 w-auto"
          />
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition ${
                isDark
                  ? "text-white/80 hover:text-white"
                  : "text-graphite hover:text-purple-deep"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener"
          className={`inline-flex items-center gap-2 text-xs md:text-sm font-semibold px-4 md:px-5 py-2.5 rounded-full transition ${
            isDark
              ? "bg-turquoise text-purple-shadow hover:opacity-90"
              : "bg-purple-deep text-white hover:opacity-90"
          }`}
        >
          <span className="hidden sm:inline">Agendar consulta</span>
          <span className="sm:hidden">Agendar</span>
          <ArrowRight size={14} />
        </a>
      </div>
    </header>
  );
}
