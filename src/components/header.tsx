import { NavLink } from "react-router-dom";

const NAV_ITEMS = [
  { label: "생일", to: "/" },
  { label: "타임라인", to: "/timeline" },
  { label: "메모", to: "/memo" },
  { label: "Recap", to: "/recap" },
] as const;

export default function Header() {
  return (
    <header className="w-full border-b border-white/10 bg-black/30">
      <nav className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-6 py-4 text-sm text-white">
        <span className="text-base font-semibold tracking-wide text-lime-300 cursor-pointer" onClick={() => window.location.href = "/"}>
          어벤져스 어셈블
        </span>
        <ul className="flex items-center gap-6">
          {NAV_ITEMS.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `transition-colors hover:text-lime-300 focus-visible:text-lime-300 ${
                    isActive ? "text-lime-300" : ""
                  }`
                }
                end={item.to === "/"}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
