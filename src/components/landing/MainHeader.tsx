"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ThemeToggle from "@/components/landing/ThemeToggle";

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
      <header className="theme-header sticky top-0 z-40 backdrop-blur-md">
        <div className="mx-auto flex min-h-12 max-w-6xl items-center justify-between px-5">
          <Link href="/#top" className="theme-link theme-text type-body" onClick={() => setIsOpen(false)}>
            abraar.dev
          </Link>

          <div className="ml-auto flex items-center gap-4">
            <nav className="hidden gap-7 md:flex" aria-label="Main navigation">
              {navigationItems.map((item) => (
                <Link key={item.href} href={item.href} className="theme-link theme-text type-body">
                  {item.label}
                </Link>
              ))}
            </nav>

            <ThemeToggle />

            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
              className="theme-link theme-text type-icon md:hidden"
              onClick={() => setIsOpen(true)}
            >
              <span aria-hidden="true">=</span>
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[100] transition-opacity duration-150 md:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!isOpen}
        aria-label="Mobile navigation"
      >
          <button
            type="button"
            className="theme-overlay absolute inset-0 h-full w-full"
            aria-label="Close menu"
            onClick={() => setIsOpen(false)}
          />
          <aside
            id="mobile-navigation"
            className={`theme-panel absolute right-0 top-0 flex h-full w-[min(85vw,22rem)] flex-col px-6 py-5 shadow-2xl transition-[transform,opacity] duration-150 ease-out ${
              isOpen ? "translate-x-0 opacity-100" : "pointer-events-none translate-x-full opacity-0"
            }`}
          >
            <div className="flex items-center justify-between pb-5">
              <span className="theme-link theme-text type-body">Menu</span>
              <button type="button" className="theme-link theme-text type-icon" aria-label="Close menu" onClick={() => setIsOpen(false)}>x</button>
            </div>
            <nav className="flex flex-col gap-2 py-6" aria-label="Mobile navigation links">
              {navigationItems.map((item) => (
                <Link key={item.href} href={item.href} className="theme-link theme-text type-body py-3" onClick={() => setIsOpen(false)}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </aside>
      </div>
    </>
  );
}
