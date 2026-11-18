// Stable, readable heading ids: "Can non-swimmers go kayaking?" → "can-non-swimmers-go-kayaking".
// Used for every H2/H3 rendered from data, so answers can be linked to (#anchor) and cited by section.
export function slug(text: string) {
  return text
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
    .replace(/-+$/g, "");
}
