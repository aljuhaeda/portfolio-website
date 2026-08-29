export const en = {
  nav: { work: "Work", about: "About", contact: "Contact" },
  toggle: { dark: "Dark", light: "Light", lang: "ID" },

  hero: {
    eyebrow: "AI · ML Engineer — Bogor, Indonesia",
    line1: "I went back and made",
    line2: "every number",
    line3: "honest.",
    caption:
      "BankruptWatch — the old score hid that the model caught none of the real bankruptcies. Honest recall: 57%, at 40.3% precision.",
    cta: "Read the reworks",
  },

  about: {
    kicker: "About",
    intro:
      "I'm a Computer Science graduate building machine-learning models and data-driven applications, with published NLP research and projects spanning text classification, medical imaging and financial risk. I care as much about whether a reported result is true as about whether the model ships.",
    published: "Published",
    studied: "Studied",
    believe: "Believe",
    believeText:
      "Whether a reported result is true matters as much as whether the model ships.",
    studiesH: "Studies",
    skillsH: "Technical skills",
    paperCta: "Read the paper (PDF)",
  },

  log: {
    reworksH: "The reworks",
    shippedH: "Also shipped",
    open: "open rework",
    close: "close",
    metaRework: "Earlier build → reworked 2026",
    metaMerge: "Two prototypes → merged 2026",
    metaShip: "Shipped to production · 2026",
    readFull: "Read the full rework",
    before: "before",
    after: "after",
  },

  visit: {
    demo: "Live demo",
    site: "Live site",
    app: "Live app",
    src: "Source",
    all: "View all work",
  },

  hire: {
    kicker: "Open to ML roles",
    line: "If you want someone who checks the number before the demo — let's talk.",
    button: "Email me",
  },

  work: { title: "Work", intro: "Every project, and what changed." },

  project: { back: "All work", next: "Next", prev: "Previous", links: "Links" },

  notFound: { title: "Not found", body: "That page doesn't exist.", home: "Back home" },
} as const;

type Widen<T> = { [K in keyof T]: { [P in keyof T[K]]: string } };
export type Dict = Widen<typeof en>;
