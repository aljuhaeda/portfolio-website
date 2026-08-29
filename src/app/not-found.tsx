import Link from "next/link";
import { getDict } from "@/i18n";

export default async function NotFound() {
  const { t } = await getDict();
  return (
    <main
      style={{
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        textAlign: "center",
        padding: "0 var(--pad)",
      }}
    >
      <p className="mono-eyebrow">404</p>
      <h1 style={{ fontSize: "var(--step-3)", margin: 0 }}>{t.notFound.title}</h1>
      <p style={{ color: "var(--muted)" }}>{t.notFound.body}</p>
      <Link
        href="/"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.8rem",
          textTransform: "uppercase",
          letterSpacing: "0.09em",
          borderBottom: "2px solid var(--red)",
          textDecoration: "none",
          paddingBottom: "3px",
        }}
      >
        {t.notFound.home} →
      </Link>
    </main>
  );
}
