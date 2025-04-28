export type AnalyzePayload = {
  appName: string;
};

export type AnalyzeResponse = {
  averageSentiment: number;
  reviewCount: number;
  appId: string;
};

export async function analyzeApp(
  payload: AnalyzePayload
): Promise<AnalyzeResponse> {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
  const res = await fetch(`${base}/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }
  return res.json();
}
