Play-Store Sentiment Analyzer 🛒🔍
The Play-Store Sentiment Analyzer is a sophisticated tool designed to evaluate the sentiment of the 100 most recent Google Play Store reviews for any Android application. By inputting an app name, the system retrieves reviews, processes them through Gemini 1.5-flash, and delivers a precise average sentiment score. This solution combines a high-performance backend with a refined, user-friendly frontend for seamless operation.

🌟 Key Features

Accurate Sentiment Analysis: Retrieves the 100 latest reviews and computes an average sentiment score (-1 to 1) using Gemini 1.5-flash.
Intelligent Autocomplete: Provides app name suggestions during input, with robust error handling for uninterrupted usability.
Elegant User Interface: Built with Next.js and TailwindCSS for a responsive, visually appealing experience.
Optimized Performance: Leverages asynchronous review fetching and a single Gemini API call for maximum efficiency.


🛠 Technology Stack



Layer
Technologies



Backend
FastAPI, google-play-scraper, Google Generative AI SDK


Frontend
Next.js 14 (App Router), TailwindCSS 3


Concurrency
Asynchronous review fetching, single Gemini API call



🚀 Getting Started
Clone the repository to begin:
git clone https://github.com/kaifhb/Play-Store-Sentiment-Analyzer.git
cd play-store-sentiment

Backend Configuration
Navigate to the backend directory and set up the environment:
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt

Create a .env file in the backend directory with the following:
GEMINI_API_KEY=<your-gemini-api-key>

Launch the backend server:
uvicorn app.main:app --reload

Frontend Configuration
Navigate to the frontend directory and install dependencies:
cd ../frontend
npm install

Create a .env file in the frontend directory with the following:
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000

Start the frontend development server:
npm run dev

Access the application at http://localhost:3000.

🔍 Core Functionality
Autocomplete

Endpoint: /suggest?q=<query>
Behavior: Queries google-play-scraper for app suggestions. Returns an empty list [] in case of errors, ensuring a seamless user experience.

Review Retrieval

Method: reviews(appId, count=100, sort=NEWEST)
Purpose: Fetches the 100 most recent reviews for the specified app from the Google Play Store.

Sentiment Analysis

Prompt: "Return one number between -1 and 1."
Process: Submits all reviews to Gemini 1.5-flash in a single API call to calculate the average sentiment score.


🎨 Design and Styling

Frontend: TailwindCSS delivers a polished, responsive interface with modern design elements, including subtle animations and a cohesive color scheme.
UI Components: Features an intuitive autocomplete dropdown, a visually distinct results card, and a streamlined input form.
Backend: FastAPI ensures clean, structured JSON responses for efficient frontend integration.


🙏 Acknowledgments

FastAPI for its high-performance API framework.
Next.js for a robust, server-side rendered frontend.
TailwindCSS for its utility-first styling approach.
Google Play Scraper for reliable review extraction.
Google Gemini API for advanced sentiment analysis capabilities.


📋 Additional Notes

Verify that your Gemini API key is valid and authorized for the 1.5-flash model.
The backend is designed to handle scraper errors gracefully, maintaining application stability.
For production deployment, consider using a WSGI server (e.g., Gunicorn) for the backend and hosting the frontend on a platform like Vercel.

Start analyzing app sentiments with precision and efficiency today! 🚀
