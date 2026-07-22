"use client";

import { useState } from "react";

const links = [
  { href: "#services", label: "Services" },
  { href: "#why-us", label: "Why us" },
  { href: "#reviews", label: "Reviews" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="home-container nav-shell">
        <a className="brand" href="/" aria-label="Experience Cancun home">
          <span className="brand-mark">EC</span>
          <span>
            <strong>Experience Cancun</strong>
            <small>Travel made simple</small>
          </span>
        </a>

        <button
          className="nav-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="primary-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          Menu
        </button>

        <nav
          id="primary-navigation"
          className={`primary-nav ${open ? "is-open" : ""}`}
          aria-label="Primary navigation"
        >
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
          <a className="nav-cta" href="#search">Start booking</a>
        </nav>
      </div>
    </header>
  );
}
