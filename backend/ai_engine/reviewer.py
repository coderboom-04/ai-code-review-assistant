import os
from dotenv import load_dotenv
from groq import Groq

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def ai_explain_issue(issue, code):
    prompt = f"""
You are a senior software security engineer.

Issue detected:
Rule ID: {issue.rule_id}
Severity: {issue.severity}
Message: {issue.message}

Relevant code:
{code}

Explain the problem and suggest a fix.
"""

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {"role": "system", "content": "You are an expert code reviewer."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.3
    )

    return response.choices[0].message.content.strip()
