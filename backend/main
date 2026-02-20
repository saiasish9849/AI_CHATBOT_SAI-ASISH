import os
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# ================================
# 🔥 FORCE LOAD .env (WINDOWS FIX)
# ================================
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ENV_PATH = os.path.join(BASE_DIR, ".env")
load_dotenv(dotenv_path=ENV_PATH)

# 🔎 DEBUG (TEMPORARY – confirms env is loaded)
print("DEBUG GROQ KEY LOADED:", os.getenv("GROQ_API_KEY"))

from llm import call_llm

app = FastAPI()

# Allow frontend to talk to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str

@app.get("/")
def root():
    return {"message": "Backend is running. Use /chat"}

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/chat")
async def chat(req: ChatRequest):
    reply = await call_llm(req.message)
    return {"reply": reply}
