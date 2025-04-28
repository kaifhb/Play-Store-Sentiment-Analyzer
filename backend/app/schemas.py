from pydantic import BaseModel, Field


class AnalyzeRequest(BaseModel):
    appName: str = Field(..., examples=["Spotify"])


class AnalyzeResponse(BaseModel):
    averageSentiment: float
    reviewCount: int
    appId: str
