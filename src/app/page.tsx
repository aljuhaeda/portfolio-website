import { getDict } from "@/i18n";
import { getProjects } from "@/lib/projects";
import { Hero } from "@/components/Hero";
import { AboutBand } from "@/components/AboutBand";
import { LogGroup } from "@/components/LogGroup";
import { HireBand } from "@/components/HireBand";
import styles from "./page.module.css";

export default async function Home() {
  const { t } = await getDict();
  const projects = getProjects();
  const reworks = projects.filter((p) => p.bucket === "rework");
  const shipped = projects.filter((p) => p.bucket === "shipped");

  return (
    <main>
      <Hero t={t.hero} />
      <AboutBand t={t.about} />
      <section className={styles.log}>
        <LogGroup id="reworks" heading={t.log.reworksH} projects={reworks} t={t} />
        <LogGroup heading={t.log.shippedH} projects={shipped} t={t} second />
      </section>
      <HireBand t={t.hire} />
    </main>
  );
}
