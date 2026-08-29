import { getDict } from "@/i18n";
import { getProjects } from "@/lib/projects";
import { Hero } from "@/components/Hero";
import { AboutBand } from "@/components/AboutBand";
import { LogGroup, rowLabels } from "@/components/LogGroup";
import { HireBand } from "@/components/HireBand";
import styles from "./page.module.css";

export default async function Home() {
  const { t } = await getDict();
  const projects = getProjects();
  const reworks = projects.filter((p) => p.bucket === "rework");
  const shipped = projects.filter((p) => p.bucket === "shipped");
  const labels = rowLabels(t);

  return (
    <main>
      <Hero t={t.hero} />
      <AboutBand t={t.about} />
      <section className={styles.log}>
        <div className={styles.rail} aria-hidden="true">
          <span style={{ top: "4%" }}>{t.log.railThen}</span>
          <span style={{ top: "96%" }}>{t.log.railNow}</span>
        </div>
        <LogGroup id="reworks" heading={t.log.reworksH} projects={reworks} labels={labels} />
        <LogGroup heading={t.log.shippedH} projects={shipped} labels={labels} second />
      </section>
      <HireBand t={t.hire} />
    </main>
  );
}
