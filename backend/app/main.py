"""
FastAPI entry-point exposing one POST /analyze endpoint.
"""

import asyncio

from fastapi import FastAPI, HTTPException, Query
from typing import List, Dict
from fastapi.middleware.cors import CORSMiddleware

from . import review_fetcher, sentiment
from .suggest import suggest_apps
from .schemas import AnalyzeRequest, AnalyzeResponse
app = FastAPI(title="Play-Store Sentiment Analyzer")

# Allow local Next.js dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["POST"],
    allow_headers=["*"],
)

@app.get("/suggest")
async def suggest(q: str = Query(..., min_length=2)) -> List[Dict[str, str]]:
   
      
   
      return suggest_apps(q)

@app.post("/analyze", response_model=AnalyzeResponse)
async def analyze(req: AnalyzeRequest):
    try:
        app_id, texts = review_fetcher.fetch_latest_reviews(req.appName, limit=100)
        # print("hhhhh", app_id, texts)
    except ValueError as exc:
        raise HTTPException(status_code=404, detail=str(exc))

    if not texts:
        raise HTTPException(status_code=400, detail="No reviews retrieved")

    average = round(await sentiment.average_score(texts), 3)
    

    return AnalyzeResponse(
        averageSentiment=average, reviewCount=len(texts), appId=app_id
    )


# For `uvicorn backend.app.main:app --reload`
