// Structural site data that isn't translated (identity, links, routes).
// Translated UI copy lives in src/i18n/*.

export const baseURL = "https://aljuhaeda.com"; // bare — never prefix a scheme

export const routes: Record<string, boolean> = {
  "/": true,
  "/about": true,
  "/work": true,
};

export const person = {
  firstName: "Zul Iflah",
  lastName: "Al Juhaeda",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "AI / Machine Learning Engineer",
  avatar: "/images/avatar.jpg",
  email: "aljuhaeda@gmail.com",
  locationLabel: "Bogor, Indonesia",
};

export const social = [
  { name: "GitHub", href: "https://github.com/aljuhaeda" },
  { name: "LinkedIn", href: "https://linkedin.com/in/aljuhaeda" },
  { name: "Email", href: `mailto:${person.email}` },
];

// Citation per Garuda (garuda.kemdiktisaintek.go.id/documents/detail/4926421),
// Indonesia's official journal index — Vol. 1 No. 2, Dec 2024. The PDF
// masthead reads "Issue 1, July 2024"; Garuda is the index of record.
// Page range 34–41 from the PDF. Verified 2026-08-30.
export const paper = {
  authors: "Al Juhaeda, Z. I., Faisal, M., & Suhartono",
  year: 2024,
  title:
    "Sentiment Classification of Hate Speech Against Islam on Twitter Platform Using Multinomial Naïve Bayes",
  venue: "Journal of Informatics and Science Media (JISMEDIA)",
  detail: "Vol. 1, No. 2, pp. 34–41, December 2024. ISSN 3064-1942.",
  url: "https://garuda.kemdiktisaintek.go.id/documents/detail/4926421",
  pdf: "/paper/al-juhaeda-2024-jismedia.pdf",
};

export const studies = [
  {
    name: "UIN Maulana Malik Ibrahim Malang",
    detail: "BSc Computer Science — GPA 3.50 / 4.00",
  },
];

export const skills = [
  {
    title: "Machine Learning & AI",
    detail:
      "scikit-learn, TensorFlow, Keras, NLP, CNNs, ensemble methods (Random Forest, AdaBoost).",
  },
  {
    title: "Data & Analytics",
    detail: "Pandas, NumPy, Matplotlib, Google Analytics 4, SEMrush.",
  },
  {
    title: "Cloud & Tools",
    detail: "GCP, AWS (GenAI foundations), Docker, Git.",
  },
];
