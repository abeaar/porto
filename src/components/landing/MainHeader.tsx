"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Theme = "dark" | "light";

const navigationItems = [
  { href: "/#top", label: "About" },
  { href: "/#experience", label: "Experience" },
  { href: "/#projects", label: "Projects" },
  { href: "/#skills", label: "Stack" },
  { href: "/#contact", label: "Contact" },
];

export default function MainHeader() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("portfolio-theme");
    const initialTheme: Theme =
      savedTheme === "dark" || savedTheme === "light"
        ? savedTheme
        : window.matchMedia("(prefers-color-scheme: light)").matches
          ? "light"
          : "dark";

    document.documentElement.dataset.theme = initialTheme;
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("keydown", closeOnEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const toggleTheme = () => {
    const nextTheme: Theme =
      document.documentElement.dataset.theme === "light"
        ? "dark"
        : "light";

    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("portfolio-theme", nextTheme);
  };

  return (
    <>
      <header className="portfolio-header">
        <div className="portfolio-header__inner">
          <button
            type="button"
            className="portfolio-theme-toggle"
            aria-label="Toggle color theme"
            title="Toggle color theme"
            onClick={toggleTheme}
          >
            <svg
              className="portfolio-theme-toggle__sun"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="3.5" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42" />
            </svg>
            <svg
              className="portfolio-theme-toggle__moon"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M20.2 15.2A8.5 8.5 0 0 1 8.8 3.8a8.5 8.5 0 1 0 11.4 11.4Z" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            className="portfolio-menu-button"
            onClick={() => setIsOpen(true)}
          >
            [ Menu ]
          </button>
        </div>
      </header>

      <div
        className={`portfolio-mobile-nav ${isOpen ? "is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!isOpen}
        inert={!isOpen}
        aria-label="Mobile navigation"
      >
        <aside id="mobile-navigation" className="portfolio-mobile-nav__panel">
          <div className="portfolio-mobile-nav__top">
            <button
              type="button"
              className="portfolio-mobile-nav__close"
              aria-label="Close menu"
              onClick={() => setIsOpen(false)}
            >
              [ Close ]
            </button>
          </div>
          <nav aria-label="Mobile navigation links">
            {navigationItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
                <span>0{index + 1}</span>
              </Link>
            ))}
          </nav>
        </aside>
      </div>
    </>
  );
}
