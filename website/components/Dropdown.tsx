"use client";

import { useEffect, useRef, useState } from "react";
import { CheckIcon, ChevronDownIcon } from "./Icons";

export interface DropdownOption<T extends string> {
  value: T;
  label: string;
}

/**
 * Styled dropdown that matches the pill aesthetic used across the site
 * (white, rounded-full, orange focus ring). Replaces the native `<select>`
 * so the open menu can use the site's rounded panel + check-mark active state.
 *
 * Keyboard:
 *  - Esc closes the menu.
 *  - Click outside closes the menu.
 */
export function Dropdown<T extends string>({
  value,
  onChange,
  options,
  ariaLabel,
  className = "",
}: {
  value: T;
  onChange: (value: T) => void;
  options: DropdownOption<T>[];
  ariaLabel: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onDocClick(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const selected = options.find((o) => o.value === value) ?? options[0];

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-2 rounded-full border border-zinc-300 bg-white px-4 py-2.5 text-sm font-medium text-zinc-800 outline-none transition hover:border-zinc-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
      >
        <span className="truncate">{selected?.label ?? "Select"}</span>
        <ChevronDownIcon
          className={`h-4 w-4 shrink-0 text-zinc-500 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open ? (
        <ul
          role="listbox"
          aria-label={ariaLabel}
          className="absolute right-0 z-20 mt-2 min-w-full overflow-hidden rounded-2xl border border-zinc-200 bg-white py-1 shadow-xl shadow-zinc-900/10"
        >
          {options.map((opt) => {
            const active = opt.value === value;
            return (
              <li key={opt.value}>
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => {
                    onChange(opt.value);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between gap-4 px-4 py-2.5 text-left text-sm transition ${
                    active
                      ? "bg-orange-50 font-semibold text-orange-700"
                      : "text-zinc-700 hover:bg-zinc-50"
                  }`}
                >
                  <span className="truncate">{opt.label}</span>
                  {active ? (
                    <CheckIcon className="h-4 w-4 shrink-0 text-orange-600" />
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
