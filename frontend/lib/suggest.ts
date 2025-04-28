
export type Suggestion = { name: string; appId: string };

let timer: NodeJS.Timeout | undefined;

export function suggestApps(
  query: string,
  cb: (list: Suggestion[]) => void,
  delay = 250
) {
  if (timer) clearTimeout(timer);
  timer = setTimeout(async () => {
    if (query.length < 2) return cb([]);
    try {
      const base =
        process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
      const res = await fetch(`${base}/suggest?q=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error();
      cb(await res.json());
    } catch {
      cb([]);           // backend unreachable → just show no suggestions
    }
  }, delay);
}
