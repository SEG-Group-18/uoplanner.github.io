"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSite } from "@/components/SiteProvider";

export function Header() {
  const { locale, message, toggleLocale, theme, toggleTheme } = useSite();
  const pathname = usePathname();
  const currentPath = pathname.replace(/\/$/, "") || "/";
  const links = [
    { href: "/", label: message.home },
    { href: "/product/", label: message.product },
    { href: "/pricing/", label: message.pricing },
    { href: "/team/", label: message.team },
  ];

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" href="/" aria-label={message.brand}>
          <Image
            className="brand-logo"
            src="/media/uoplannerlogo.png"
            alt=""
            width={246}
            height={194}
            preload
          />
        </Link>
        <nav className="main-nav" aria-label={locale === "fr" ? "Principale" : "Main"}>
          {links.map(({ href, label }) => {
            const normalizedHref = href.replace(/\/$/, "") || "/";
            const active =
              currentPath === normalizedHref ||
              (normalizedHref !== "/" && currentPath.startsWith(`${normalizedHref}/`));
            return (
              <Link
                href={href}
                key={href}
                aria-current={active ? "page" : undefined}
                className={active ? "active" : undefined}
              >
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="header-actions">
          <Link className="header-cta" href="/#schedule">
            {message.headerCta}
            <span aria-hidden="true">→</span>
          </Link>
          <div className="header-tools">
            <button
              className="icon-button language-button"
              type="button"
              aria-label={message.languageLabel}
              onClick={toggleLocale}
            >
              {locale === "en" ? "FR" : "EN"}
            </button>
            <button
              className="icon-button"
              type="button"
              aria-label={message.themeAction}
              onClick={toggleTheme}
            >
              <span aria-hidden="true">{theme === "light" ? "☾" : "☼"}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
