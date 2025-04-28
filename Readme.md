# Play-Store Sentiment Analyzer 🛒🔍

Type (or autocomplete) any Android app name, grab its 100 newest Play-Store
reviews, run them through **Gemini 1.5-flash** for sentiment, and see the
average score.

| Layer       | Tech                                                     |
| ----------- | -------------------------------------------------------- |
| Backend     | FastAPI · google-play-scraper · Google Generative AI SDK |
| Frontend    | Next 14 (App Router) · Tailwind 3                        |
| Concurrency | Reviews fetched async · one Gemini call for all reviews  |



## Quick-start

```bash
git clone https://github.com/kaifhb/Play-Store-Sentiment-Analyzer.git
cd play-store-sentiment
```

## Backend-Setup

cd backend
python -m venv .venv && source .venv/bin/activate 
pip install -r requirements.txt
.env # add GEMINI_API_KEY=<your-key>
uvicorn app.main:app --reload 


## Frontend-Setup

cd ../frontend
npm install 
.env # add NEXT_PUBLIC_BACKEND_URL=http://localhost:8000 
npm run dev # http://localhost:3000


🛠 Codebase Structure

## Backend API Overview

Endpoint | Method | Description
/analyze | POST | { "appName": "Spotify" } → Returns average sentiment JSON
/suggest?q=sp | GET | Returns autocomplete suggestions list

## Backend Files

File | Purpose
review_fetcher.py | Resolve app name to appId, fetch 100 newest reviews
sentiment.py | Single Gemini call to get average sentiment score
suggest.py | Resilient autocomplete (returns empty list [] on scraper errors)

##  Frontend Files

File/Path | Purpose
app/globals.css | TailwindCSS directives + small body tweaks
app/layout.tsx | Imports globals and sets metadata
app/page.tsx | Main UI: input, autocomplete, results card
lib/api.ts | Handles fetch for /analyze
lib/suggest.ts | Debounced fetch for /suggest

🔥 Core Logic

## Autocomplete
/suggest?q= hits google-play-scraper search; if it errors, returns [] (silent UI fail).

## Reviews
reviews(appId, count=100, sort=NEWEST) pulls the latest 100 reviews from Play Store.

## Sentiment Analysis
One Gemini prompt:

"Return one number between -1 and 1."
Calculates the average sentiment across reviews.

🙏 Credits

FastAPI
Next.js
TailwindCSS
Google Play Scraper
Google Gemini API
