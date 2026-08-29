import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import styles from "./Mdx.module.css";

function slugify(s: ReactNode): string {
  return String(s)
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/&/g, "-and-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
}

function A({ href = "", children, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  if (href.startsWith("/")) return <Link href={href}>{children}</Link>;
  if (href.startsWith("#"))
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    );
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </a>
  );
}

const components = {
  a: A,
  h2: ({ children }: { children: ReactNode }) => <h2 id={slugify(children)}>{children}</h2>,
  h3: ({ children }: { children: ReactNode }) => <h3 id={slugify(children)}>{children}</h3>,
};

export function Mdx({ source }: { source: string }) {
  return (
    <div className={styles.prose}>
      <MDXRemote source={source} components={components} />
    </div>
  );
}
