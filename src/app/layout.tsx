import type { Metadata } from "next";
import { Instrument_Serif, Newsreader, JetBrains_Mono } from "next/font/google";
import "@/styles/globals.css";
import { getDict } from "@/i18n";
import { baseURL, person } from "@/lib/content";
import { Shell } from "@/components/Shell";
import { Cursor } from "@/components/Cursor";
import { Footer } from "@/components/Footer";

const instrument = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});
const newsreader = Newsreader({
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
});
const mono = JetBrains_Mono({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-mono-jb",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(baseURL),
  title: {
    default: `${person.name} — ${person.role}`,
    template: `%s — ${person.name}`,
  },
  description:
    "AI / ML engineer in Bogor, Indonesia. Published NLP research and eight machine-learning projects, each revisited until the reported number was honest.",
  openGraph: {
    type: "website",
    locale: "en",
    url: baseURL,
    siteName: person.name,
  },
};

// Pre-paint: apply saved theme and mark repeat visits before first paint.
const THEME_SCRIPT = `try{
  var t=localStorage.getItem('rc-theme');
  if(t==='dark'||t==='light')document.documentElement.dataset.theme=t;
  if(sessionStorage.getItem('rc-seen'))document.documentElement.classList.add('nodelay');
  sessionStorage.setItem('rc-seen','1');
}catch(e){}`;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { lang, t } = await getDict();

  return (
    <html
      lang={lang}
      className={`${instrument.variable} ${newsreader.variable} ${mono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>
        <div className="veil" aria-hidden="true" />
        <Cursor />
        <Shell nav={t.nav} toggle={t.toggle} lang={lang} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
