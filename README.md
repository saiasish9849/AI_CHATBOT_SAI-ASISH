title: AI Chatbot

description: >
  Simple AI chatbot built using FastAPI and Groq.
  The backend handles API requests and connects to Groq LLM,
  while the frontend provides a basic chat interface.

requirements:
  - Python 3.10+
  - Groq API key

setup:
  clone:
    - git clone https://github.com/saiasish9849/AI_CHATBOT_SAI-ASISH.git
    - cd AI_CHATBOT

  backend:
    - cd backend
    - python -m venv .venv
    - .\.venv\Scripts\Activate.ps1
    - pip install -r requirements.txt

  environment:
    file: backend/.env
    content:
      GROQ_API_KEY: your_groq_api_key
      GROQ_MODEL: llama-3.1-8b-instant

  run_backend:
    - uvicorn main:app --reload

frontend:
  run:
    - Open frontend/index.html in a browser

api_endpoints:
  - GET /health
  - POST /chat

notes:
  - Backend must be running before using the frontend
  - .env file should not be committed to GitHub

author: Rohan Varma
