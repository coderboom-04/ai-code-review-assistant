import ast
from analyzer.issues import Issue

class SecurityRules(ast.NodeVisitor):
    def __init__(self):
        self.issues = []

    def visit_Call(self, node):
        if isinstance(node.func, ast.Name):
            if node.func.id in ["eval", "exec"]:
                self.issues.append(
                    Issue("RCE_001", "CRITICAL",
                          f"Dangerous use of {node.func.id}", node.lineno)
                )

            if node.func.id in ["md5", "sha1"]:
                self.issues.append(
                    Issue("CRYPTO_001", "HIGH",
                          "Weak cryptographic hash used", node.lineno)
                )

            if node.func.id == "open" and node.args:
                self.issues.append(
                    Issue("FILE_001", "MEDIUM",
                          "File opened with user-controlled input", node.lineno)
                )

        if isinstance(node.func, ast.Attribute):
            if node.func.attr in ["system", "popen"]:
                self.issues.append(
                    Issue("CMD_001", "CRITICAL",
                          "Possible command injection", node.lineno)
                )

        self.generic_visit(node)

    def visit_Assign(self, node):
        if isinstance(node.targets[0], ast.Name):
            name = node.targets[0].id.lower()
            if any(k in name for k in ["pass", "pwd", "secret", "key"]):
                self.issues.append(
                    Issue("SECRET_001", "HIGH",
                          "Hardcoded secret detected", node.lineno)
                )
        self.generic_visit(node)

    def visit_FunctionDef(self, node):
        if len(node.body) > 5:
            self.issues.append(
                Issue("SMELL_001", "LOW",
                      f"Function '{node.name}' is too long", node.lineno)
            )
        self.generic_visit(node)
    def visit_BinOp(self, node):
        if isinstance(node.op, ast.Add):
            left = node.left
            right = node.right

            if isinstance(left, ast.Name) and isinstance(right, ast.Name):
                self.issues.append(
                    Issue(
                        "LOGIC_001",
                        "MEDIUM",
                        "Possible type mismatch in addition operation",
                        node.lineno
                    )
                )

        self.generic_visit(node)
    def visit_Assign(self, node):
        if isinstance(node.targets[0], ast.Name):
            var_name = node.targets[0].id
            if var_name.startswith("_"):
                self.issues.append(
                    Issue(
                        "SMELL_002",
                        "LOW",
                        f"Variable '{var_name}' may be unused",
                        node.lineno
                    )
                )
        self.generic_visit(node)


