import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(__file__)))

from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from analyzer.engine import analyze_code
from ai_engine.reviewer import ai_explain_issue
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class CodeInput(BaseModel):
    code: str

SEVERITY_ORDER = {"CRITICAL": 0, "HIGH": 1, "MEDIUM": 2, "LOW": 3}

@app.post("/analyze-text")
async def analyze_text(data: CodeInput):
    code = data.code
    issues = analyze_code(code)

    issues.sort(key=lambda i: SEVERITY_ORDER.get(i.severity, 99))

    summary = {
        "CRITICAL": 0,
        "HIGH": 0,
        "MEDIUM": 0,
        "LOW": 0
    }

    results = []
    for issue in issues:
        summary[issue.severity] += 1
        results.append({
            "issue": issue.to_dict(),
            "ai_explanation": ai_explain_issue(issue, code)
        })

    return {
        "summary": summary,
        "results": results
    }

@app.post("/analyze")
async def analyze(file: UploadFile = File(...)):
    code = (await file.read()).decode("utf-8")
    issues = analyze_code(code)

    results = []
    for issue in issues:
        results.append({
            "issue": issue.to_dict(),
            "ai_explanation": ai_explain_issue(issue, code)
        })

    return {"results": results}
