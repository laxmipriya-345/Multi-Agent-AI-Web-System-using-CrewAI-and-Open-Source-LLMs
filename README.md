# 🤖 Multi-Agent AI Web System

A full-stack AI-powered web application that uses a **multi-agent architecture** to generate intelligent, refined responses using open-source LLMs.

---

## 🚀 Project Overview

This project implements a **Multi-Agent AI System** where different agents collaborate to process user queries:

* 🧠 Analyzer Agent → Understands user input
* ✍️ Generator Agent → Generates response
* 🔍 Evaluator Agent → Refines and improves output

The system uses **CrewAI** for agent orchestration and integrates with **LLaMA / Mistral** models for text generation.

---

## 🏗️ Architecture

```
Frontend (React + Tailwind)
        ↓
Flask Backend API
        ↓
CrewAI Agent Controller
        ↓
Analyzer → Generator → Evaluator
        ↓
LLM (LLaMA / Mistral)
        ↓
SQLite Database
        ↓
Response to UI
```

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Tailwind CSS

### Backend

* Python (Flask)

### AI / Agents

* CrewAI
* LLaMA / Mistral (via Ollama or API)

### Database

* SQLite

---

## ⚙️ Installation & Setup

### 1. Clone Repository

```bash
git clone https://github.com/your-username/multi-agent-ai.git
cd multi-agent-ai
```

---

### 2. Setup Backend

```bash
cd backend
python -m venv venv
```

Activate virtual environment:

```bash
# Windows PowerShell
.\venv\Scripts\Activate.ps1

# CMD
venv\Scripts\activate.bat
```

Install dependencies:

```bash
pip install flask crewai
```

---

### 3. Run LLM (Ollama)

Install Ollama and run:

```bash
ollama run mistral
```

---

### 4. Run Backend

```bash
python app.py
```

---

### 5. Setup Frontend

```bash
cd frontend
npm install
npm start
```

---

## 🧠 How It Works

1. User enters a query in the web interface
2. Backend sends query to CrewAI agents
3. Agents process in sequence:

   * Analyzer → understands input
   * Generator → creates response
   * Evaluator → improves output
4. LLM generates final content
5. Response is stored in SQLite
6. Output displayed in UI

---

## 🌟 Features

* Multi-agent AI system
* Context-aware responses
* Modular architecture
* Chat history storage
* Scalable and extensible

---

## 🔥 Future Improvements

* Add multi-turn conversation memory
* Integrate domain-specific models (medical, legal, etc.)
* Add voice input/output
* Deploy using Docker & cloud
* Add user authentication

---

## 📌 Project Use Cases

* AI assistants
* Educational tools
* Medical AI support systems
* Code generation tools

---

## 👨‍💻 Author

Laxmipriya Rout
## 📜 License

This project is for educational and research purposes.
