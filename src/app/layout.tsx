import type { Metadata } from "next";
import { Instrument_Serif, Newsreader, JetBrains_Mono } from "next/font/google";
import "@/styles/globals.css";
import { getDict } from "@/i18n";
import { baseURL, person } from "@/lib/content";
import { Shell } from "@/components/Shell";
import { Cursor } from "@/components/Cursor";
import { Loader } from "@/components/Loader";
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
    images: [
      {
        url: `${baseURL}/og?title=${encodeURIComponent("I went back and made every number honest.")}`,
        width: 1280,
        height: 720,
      },
    ],
  },
  icons: { icon: "/favicon.ico" },
};

// Pre-paint: apply saved theme; skip the intro choreography on repeat views.
// On the first view, stamp .nodelay once the choreography has finished (~3.2s)
// so client-side navigation back to "/" doesn't replay a blank hero.
const THEME_SCRIPT = `try{
  var d=document.documentElement,t=localStorage.getItem('rc-theme');
  if(t==='dark'||t==='light')d.dataset.theme=t;
  if(sessionStorage.getItem('rc-seen')){d.classList.add('nodelay');d.classList.add('noloader');}
  else setTimeout(function(){d.classList.add('nodelay')},3200);
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
      // the pre-paint script sets data-theme / .nodelay / .noloader on <html>
      // before React hydrates; without this, that's a hydration attr mismatch
      suppressHydrationWarning
      className={`${instrument.variable} ${newsreader.variable} ${mono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>
        <Loader label={t.hero.loader} />
        <div className="veil" aria-hidden="true" />
        <Cursor />
        <Shell nav={t.nav} toggle={t.toggle} lang={lang} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
