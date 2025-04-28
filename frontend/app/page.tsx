// "use client";

// import { FormEvent, useState } from "react";
// import { analyzeApp, AnalyzeResponse } from "../lib/api";
// import { suggestApps, Suggestion } from "../lib/suggest";

// export default function Home() {
//   const [appName, setAppName] = useState("");
//   const [result, setResult] = useState<AnalyzeResponse | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
//   async function handleSubmit(e: FormEvent) {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     setResult(null);

//     try {
//       const data = await analyzeApp({ appName });
//       setResult(data);
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <main>
//       <h1>Play-Store Sentiment Analyzer</h1>

//       <form onSubmit={handleSubmit}>
//         <input
//           value={appName}
//           onChange={(e) => {
//             const val = e.target.value;
//             setAppName(val);
//             suggestApps(val, setSuggestions); // ← live suggestions
//           }}
//           placeholder="Enter Android app name"
//           required
//         />
//         <button type="submit" style={{ marginLeft: "0.5rem" }}>
//           {loading ? "Analyzing…" : "Analyze"}
//         </button>
//       </form>
//       {suggestions.length > 0 && (
//         <ul
//           style={{
//             listStyle: "none",
//             padding: 0,
//             marginTop: 4,
//             border: "1px solid #ddd",
//           }}
//         >
//           {suggestions.map((s) => (
//             <li
//               key={s.appId}
//               style={{ padding: "4px 8px", cursor: "pointer" }}
//               onClick={() => {
//                 setAppName(s.name);
//                 setSuggestions([]);
//               }}
//             >
//               {s.name}
//             </li>
//           ))}
//         </ul>
//       )}
//       {error && <p style={{ color: "crimson" }}>{error}</p>}

//       {result && (
//         <section style={{ marginTop: "2rem" }}>
//           <h2>Results</h2>
//           <p>
//             <strong>{result.appId}</strong>
//           </p>
//           <p>
//             Average Sentiment: <b>{result.averageSentiment}</b>
//           </p>
//           <p>Reviews Analyzed: {result.reviewCount}</p>
//         </section>
//       )}
//     </main>
//   );
// }
"use client";

import { FormEvent, useState } from "react";
import { analyzeApp, AnalyzeResponse } from "../lib/api";
import { suggestApps, Suggestion } from "../lib/suggest";

export default function Home() {
  const [appName, setAppName] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [result, setResult] = useState<AnalyzeResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await analyzeApp({ appName });
      setResult(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const badge = (avg: number) =>
    avg > 0.15 ? "bg-green-500" : avg < -0.15 ? "bg-red-500" : "bg-amber-500";

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <main className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-semibold text-center mb-7">
          Play-Store Sentiment Analyzer
        </h1>

        {/* form */}
        <form onSubmit={handleSubmit} className="relative flex gap-3">
          <input
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-base focus:outline-brand-400"
            placeholder="Start typing an app name…"
            value={appName}
            onChange={(e) => {
              const q = e.target.value;
              setAppName(q);
              suggestApps(q, setSuggestions);
            }}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-brand-500 hover:bg-brand-400 text-white font-medium rounded-lg px-4"
          >
            {loading ? (
              <span className="inline-block w-5 h-5 border-2 border-gray-200 border-t-brand-500 rounded-full animate-spin" />
            ) : (
              "Analyze"
            )}
          </button>

          {/* autocomplete */}
          {suggestions.length > 0 && (
            <ul className="absolute top-full left-0 right-0 bg-white border border-gray-200 border-t-0 rounded-b-lg shadow max-h-60 overflow-y-auto z-10">
              {suggestions.map((s) => (
                <li
                  key={s.appId}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setAppName(s.name);
                    setSuggestions([]);
                  }}
                >
                  {s.name}
                </li>
              ))}
            </ul>
          )}
        </form>

        {error && <p className="text-red-600 mt-3">{error}</p>}

        {result && (
          <section className="mt-8 bg-gray-100 rounded-lg p-4 shadow-sm">
            <p className="font-medium break-all">{result.appId}</p>

            <p className="mt-3">
              Average Sentiment:
              <span
                className={`ml-2 px-2 py-0.5 rounded-full text-white text-sm ${badge(
                  result.averageSentiment
                )}`}
              >
                {result.averageSentiment}
              </span>
            </p>

            <p className="mt-1 text-sm text-gray-600">
              Reviews Analyzed: {result.reviewCount}
            </p>
          </section>
        )}
      </main>
    </div>
  );
}
