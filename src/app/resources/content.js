const person = {
  firstName: "Zul Iflah",
  lastName: "Al Juhaeda",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "AI / Machine Learning Engineer",
  avatar: "/images/avatar.jpg",
  email: "aljuhaeda@gmail.com",
  location: "Asia/Jakarta", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["English", "Bahasa Indonesia"],
};

const newsletter = {
  display: false,
  title: <>Subscribe to {person.firstName}&apos;s Newsletter</>,
  description: <></>,
};

const social = [
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/aljuhaeda",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://linkedin.com/in/aljuhaeda",
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
  },
];

const home = {
  path: "/",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Building machine learning that holds up under scrutiny</>,
  featured: {
    display: true,
    title: <>Featured project: <strong className="ml-4">KlasifikasiSentimenTwitter</strong></>,
    href: "/work/klasifikasisentimentwitter-hate-speech-classifier",
  },
  subline: (
    <>
      I&apos;m Zul, an AI/ML engineer building text classifiers, computer-vision models, and
      <br /> data-driven applications — and verifying every result before I call it done.
    </>
  ),
};

const about = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        I&apos;m a Computer Science graduate building machine learning models and data-driven
        applications, with published research in NLP and hands-on projects spanning text
        classification, medical imaging, and financial risk prediction. I care as much about
        whether a reported result is actually true as I do about shipping the model — several of
        the projects below started as someone else&apos;s code with an unverified accuracy claim, and
        ended with a retrained model and numbers I can stand behind.
      </>
    ),
  },
  work: {
    display: false,
    title: "Work Experience",
    /** @type {{company: string, timeframe: string, role: string, achievements: any[], images: any[]}[]} */
    experiences: [],
  },
  studies: {
    display: true,
    title: "Studies",
    institutions: [
      {
        name: "UIN Maulana Malik Ibrahim Malang",
        description: <>Computer Science — GPA 3.50 / 4.00.</>,
      },
    ],
  },
  technical: {
    display: true,
    title: "Technical skills",
    skills: [
      {
        title: "Machine Learning & AI",
        description: (
          <>scikit-learn, TensorFlow, Keras, NLP, CNNs, and ensemble methods (Random Forest, AdaBoost).</>
        ),
        images: [],
      },
      {
        title: "Data & Analytics",
        description: <>Pandas, NumPy, Matplotlib, Google Analytics 4, SEMrush.</>,
        images: [],
      },
      {
        title: "Cloud & Tools",
        description: <>GCP, AWS (GenAI foundations), Docker, Git.</>,
        images: [],
      },
    ],
  },
};

const blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about ML and software engineering...",
  description: `Read what ${person.name} has been up to recently`,
};

const work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Machine learning and software projects by ${person.name}`,
};

const gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  /** @type {{src: string, alt: string, orientation: string}[]} */
  images: [],
};

export { person, social, newsletter, home, about, blog, work, gallery };
