
"""
Robust helper for the /suggest endpoint.
If the scraper fails or Play-Store blocks us, just return [] instead of 500.
"""

from typing import List, Dict
from google_play_scraper import search


def suggest_apps(query: str, limit: int = 7) -> List[Dict[str, str]]:
    if len(query) < 2:           # debounce tiny inputs
        return []

    try:
        raw_results = search(query, lang="en", country="us", n_hits=limit)
    except Exception:
        # scraper raised, or Play-Store structure changed
        return []

    results: List[Dict[str, str]] = []
    for item in raw_results or []:
        if isinstance(item, dict) and item.get("title") and item.get("appId"):
            results.append({"name": item["title"], "appId": item["appId"]})
        if len(results) == limit:
            break

    return results
