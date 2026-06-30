// Tiny {placeholder} interpolation so message catalogs stay plain, serializable
// strings - they cross the server → client boundary as props.
export function format(
  template: string,
  vars: Record<string, string | number> = {},
): string {
  return template.replace(/\{(\w+)\}/g, (_, key) =>
    vars[key] != null ? String(vars[key]) : `{${key}}`,
  );
}
