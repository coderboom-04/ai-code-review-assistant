import ast
from analyzer.rules import SecurityRules

def analyze_code(code: str):
    tree = ast.parse(code)
    analyzer = SecurityRules()
    analyzer.visit(tree)
    return analyzer.issues

