"""
Async helper that scores *all* reviews in one Gemini call.

Returned value:
    –1.0  → very negative 
     0.0  → neutral 
    +1.0  → very positive 
"""

import os
from typing import List

import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()                                 # read .env
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
_MODEL = genai.GenerativeModel("gemini-1.5-flash-latest")


async def average_score(texts: List[str]) -> float:
    """
    Ask Gemini to compute ONE average-sentiment number for the entire list.
    """

    # Build a concise prompt so we stay well below the context limit.
    reviews_block = "\n---\n".join(texts)
    prompt = (
        "You are a strict sentiment calculator.\n"
        "Given a set of Google-Play reviews delimited by <<< >>>, "
        "return ONLY ONE floating-point number between -1 and 1 inclusive.\n"
        "It must be **the arithmetic average** of the individual review sentiments:\n"
        "    -1  = very negative, 0 = neutral, 1 = very positive.\n"
        "NO text, NO explanation—just the number.\n\n"
        "<<<\n"
        f"{reviews_block}\n"
        ">>>"
    )

    response = await _MODEL.generate_content_async(prompt)

    try:
        print("response is here" ,response)
        return float(response.text.strip())
    except Exception:
        print("here is error" )
        # If Gemini replies with something unexpected, fall back to neutral.
        return 0.0
