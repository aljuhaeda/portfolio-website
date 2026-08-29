import type { Dict } from "@/i18n";
import type { Project } from "@/lib/projects";
import { ProjectRow } from "./ProjectRow";
import styles from "./LogGroup.module.css";

export function LogGroup({
  id,
  heading,
  projects,
  t,
  second = false,
}: {
  id?: string;
  heading: string;
  projects: Project[];
  t: Dict;
  second?: boolean;
}) {
  return (
    <>
      <h2 id={id} className={`${styles.groupH} ${second ? styles.second : ""}`.trim()}>
        {heading} <span className={styles.n}>· {projects.length}</span>
      </h2>
      {projects.map((p) => (
        <ProjectRow key={p.slug} p={p} t={t} />
      ))}
    </>
  );
}
