"use client";

import Link from "next/link";
import { useSite } from "@/components/SiteProvider";

export function Footer() {
  const { message } = useSite();

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <Link className="footer-brand" href="/">
          {message.brand}
        </Link>
        <p>{message.footerText}</p>
        <nav aria-label={message.team}>
          <Link href="/">{message.home}</Link>
          <Link href="/product/">{message.product}</Link>
          <Link href="/pricing/">{message.pricing}</Link>
          <Link href="/team/">{message.team}</Link>
        </nav>
        <small>© 2026 UOPlanner</small>
      </div>
    </footer>
  );
}
