"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { Lang } from "@/i18n";
import styles from "./Shell.module.css";

type Props = {
  nav: { work: string; about: string; contact: string };
  toggle: { dark: string; light: string; lang: string };
  lang: Lang;
};

const YEAR = 60 * 60 * 24 * 365;

export function Shell({ nav, toggle, lang }: Props) {
  const router = useRouter();
  const [dark, setDark] = useState(false);

  useEffect(() => {
    // One-shot sync to the theme the pre-paint script already applied to
    // <html> before React hydrated. Not a cascading render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDark(document.documentElement.dataset.theme === "dark");
  }, []);

  function flipTheme() {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("rc-theme", next);
    } catch {}
    setDark(next === "dark");
  }

  function flipLang() {
    const next: Lang = lang === "en" ? "id" : "en";
    document.cookie = `rc-lang=${next}; path=/; max-age=${YEAR}; samesite=lax`;
    try {
      localStorage.setItem("rc-lang", next);
    } catch {}
    router.refresh();
  }

  return (
    <header className={styles.shell}>
      <Link href="/" className={styles.mark}>
        aljuhaeda
      </Link>
      <nav className={styles.right}>
        <span className={styles.links}>
          <Link href="/work">{nav.work}</Link>
          <Link href="/about">{nav.about}</Link>
          <Link href="/#hire">{nav.contact}</Link>
        </span>
        <button type="button" onClick={flipLang} aria-label="Switch language">
          {toggle.lang}
        </button>
        <button type="button" onClick={flipTheme} aria-label="Toggle colour theme">
          {dark ? toggle.light : toggle.dark}
        </button>
      </nav>
    </header>
  );
}
