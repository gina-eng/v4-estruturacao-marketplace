import { ReactNode } from "react";

const BG_MAP = {
  cream: "bg-[#FBF4E4]",
  purple: "bg-[#4B1C7D] text-[#FBF4E4]",
  white: "bg-white",
  beige: "bg-[#F6EAD8]",
};

export default function SlideShell({
  block,
  blockLabel,
  topic,
  bg = "cream",
  children,
  hideHeader = false,
}: {
  block: 0 | 1 | 2 | 3 | 4 | 5;
  blockLabel: string;
  topic: string;
  bg?: "cream" | "purple" | "white" | "beige";
  children: ReactNode;
  hideHeader?: boolean;
}) {
  const isDark = bg === "purple";
  return (
    <div
      className={`${BG_MAP[bg]} h-full w-full flex flex-col px-12 md:px-20 lg:px-28 py-12 md:py-16 lg:py-20 overflow-hidden`}
    >
      {!hideHeader && (
        <div className="flex items-center gap-3 mb-8 md:mb-12">
          <span
            className={`text-[11px] uppercase tracking-[0.2em] font-medium ${
              isDark ? "text-[#8FD9DF]" : "text-[#008185]"
            }`}
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Bloco {block} · {blockLabel}
          </span>
          <span className={`flex-1 h-px ${isDark ? "bg-white/15" : "bg-[#4B1C7D]/12"}`} />
          <span
            className={`text-[11px] uppercase tracking-[0.2em] font-medium ${
              isDark ? "text-white/60" : "text-[#2E2E33]/55"
            }`}
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {topic}
          </span>
        </div>
      )}
      <div className="flex-1 min-h-0 flex flex-col">{children}</div>
    </div>
  );
}
