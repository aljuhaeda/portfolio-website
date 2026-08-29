import { cookies } from "next/headers";
import { en, type Dict } from "./en";
import { id } from "./id";

export type Lang = "en" | "id";
export const LANGS: Lang[] = ["en", "id"];
export const DEFAULT_LANG: Lang = "en";
export const LANG_COOKIE = "rc-lang";

const dicts: Record<Lang, Dict> = { en, id };

export async function getLang(): Promise<Lang> {
  const store = await cookies();
  return store.get(LANG_COOKIE)?.value === "id" ? "id" : DEFAULT_LANG;
}

export async function getDict(): Promise<{ lang: Lang; t: Dict }> {
  const lang = await getLang();
  return { lang, t: dicts[lang] };
}

export type { Dict };
