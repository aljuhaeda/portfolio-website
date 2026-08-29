// Lightweight tripwires for the failure modes that have shipped broken before.
// The MDX-actually-renders check is covered by `next build` (it SSGs all 8
// /work/[slug] pages — a broken body fails the build).
import { test } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";

const DIR = join(process.cwd(), "src", "app", "work", "projects");

test("8 case studies, each with frontmatter + a non-empty body", () => {
  const files = readdirSync(DIR).filter((f) => f.endsWith(".mdx"));
  assert.equal(files.length, 8, "expected 8 case studies");
  for (const f of files) {
    const { data, content } = matter(readFileSync(join(DIR, f), "utf-8"));
    assert.ok(data.title, `${f}: missing title`);
    assert.ok(data.summary, `${f}: missing summary`);
    assert.ok(content.trim().length > 100, `${f}: body too short`);
  }
});

test("projects.ts parses, buckets, and covers every slug", async () => {
  const { getProjects } = await import("../src/lib/projects.ts");
  const p = getProjects();
  assert.equal(p.length, 8);
  assert.ok(p.every((x) => x.bucket && x.meta && x.delta));
  assert.equal(p.filter((x) => x.bucket === "rework").length, 6);
});

test("baseURL is a bare origin (no scheme double-prefix)", async () => {
  const { baseURL } = await import("../src/lib/content.ts");
  assert.match(baseURL, /^https:\/\/[^/]+$/);
  assert.doesNotMatch(baseURL, /https:\/\/https/);
});
