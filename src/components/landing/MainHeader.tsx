"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

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

  return (
    <>
      <header className="portfolio-header">
        <Link
          href="/#top"
          className="portfolio-brand"
          onClick={() => setIsOpen(false)}
        >
          <span className="portfolio-brand__mark" aria-hidden="true">
            AJ
          </span>
          <span className="portfolio-brand__text">Abraar Jihaad H.</span>
        </Link>

        <Link href="/#top" className="portfolio-header__title">
          Selected
          <br />
          Works
        </Link>

        <nav className="portfolio-nav" aria-label="Main navigation">
          {navigationItems.slice(1).map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

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
            <span>Navigation / Index</span>
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
