class Issue:
    def __init__(self, rule_id, severity, message, line):
        self.rule_id = rule_id
        self.severity = severity
        self.message = message
        self.line = line

    def to_dict(self):
        return {
            "rule_id": self.rule_id,
            "severity": self.severity,
            "message": self.message,
            "line": self.line
        }
