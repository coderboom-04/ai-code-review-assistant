import os
from hashlib import md5

# Hardcoded secret
password = "admin123"

def big_function():
    a = 1
    b = 2
    c = 3
    d = 4
    e = 5
    f = 6

# User input
cmd = input("Enter command: ")

# Command Injection
os.system(cmd)

# Remote Code Execution
eval(cmd)

# Weak cryptography
hashed = md5(cmd.encode())

# Insecure file handling
file = open(cmd)
