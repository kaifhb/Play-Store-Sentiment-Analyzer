"""
Utilities to resolve a human-readable Play-Store name to an app-id
and pull the newest reviews.

• Uses google-play-scraper (unofficial; subject to Play-Store rate limits
  and TOS – see README for caveats).
"""

from typing import List, Tuple

from google_play_scraper import Sort, reviews, search


def fetch_latest_reviews(app_name: str, limit: int = 10) -> Tuple[str, List[str]]:
    # 1. Resolve the textual name → package id (e.g. "Spotify" → "com.spotify.music")
    search_results = search(app_name, lang="en", country="us",  n_hits=1)
    if not search_results:
        raise ValueError("No matching application found on Play-Store")

    app_id = search_results[0]["appId"]
  
    # 2. Grab newest reviews
    raw_reviews, _ = reviews(
        app_id,
        lang="en",
        country="us",
        sort=Sort.NEWEST,
        count=limit,
        filter_score_with=None,  # keep all stars
    )
    texts = [r["content"] for r in raw_reviews][:limit]
    return app_id, texts
