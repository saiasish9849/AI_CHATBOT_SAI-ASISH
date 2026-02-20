import os
import httpx

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
GROQ_MODEL = os.getenv("GROQ_MODEL", "llama-3.1-8b-instant")

async def call_llm(user_message: str) -> str:
    """
    Call Groq free LLM API
    """

    if not GROQ_API_KEY:
        return "Missing GROQ_API_KEY in backend/.env"

    url = "https://api.groq.com/openai/v1/chat/completions"

    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "model": GROQ_MODEL,
        "messages": [
            {"role": "system", "content": "You are a helpful, friendly chatbot."},
            {"role": "user", "content": user_message}
        ],
        "temperature": 0.7
    }

    async with httpx.AsyncClient(timeout=60) as client:
        response = await client.post(url, headers=headers, json=payload)
        response.raise_for_status()
        data = response.json()
        return data["choices"][0]["message"]["content"]