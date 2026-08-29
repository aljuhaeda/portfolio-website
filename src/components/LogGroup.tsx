import type { Dict } from "@/i18n";
import type { Project } from "@/lib/projects";
import { ProjectRow, type RowLabels } from "./ProjectRow";
import styles from "./LogGroup.module.css";

export function LogGroup({
  id,
  heading,
  projects,
  labels,
  second = false,
}: {
  id?: string;
  heading: string;
  projects: Project[];
  labels: RowLabels;
  second?: boolean;
}) {
  return (
    <>
      <h2 id={id} className={`${styles.groupH} ${second ? styles.second : ""}`.trim()}>
        {heading} <span className={styles.n}>· {projects.length}</span>
      </h2>
      {projects.map((p) => (
        <ProjectRow key={p.slug} p={p} t={labels} />
      ))}
    </>
  );
}

export function rowLabels(t: Dict): RowLabels {
  return {
    open: t.log.open,
    close: t.log.close,
    readFull: t.log.readFull,
    metaRework: t.log.metaRework,
    metaMerge: t.log.metaMerge,
    metaShip: t.log.metaShip,
    visit: t.visit,
  };
}
