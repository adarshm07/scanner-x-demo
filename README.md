# scanner-x-demo

**Deliberately vulnerable demo app for [Scanner-X](https://github.com/adarshm07/scanner).**
Don't deploy it. Every "secret" in this repo is randomly generated and fake.

- **Live report:** <https://adarshm07.github.io/scanner-x-demo/>, rebuilt by the
  [Scanner-X workflow](.github/workflows/scanner-x.yml) on every push to `main`.
- **Pull requests** are scanned for the changes they introduce only. Findings appear on the changed
  lines and the check fails at `high` or above.

## What's planted

| Kind | Where | Caught by |
| --- | --- | --- |
| Hardcoded API key and JWT secret (fake) | `src/config.js` | gitleaks |
| SQL injection | `src/routes/notes.js` | semgrep |
| Command injection | `src/routes/export.js` | semgrep |
| Reflected XSS | `src/routes/notes.js` | semgrep |
| `shell=True`, `pickle`, `yaml.load` on untrusted input | `worker/report.py` | semgrep |
| Vulnerable npm packages (lodash, jsonwebtoken, axios, minimist) | `package-lock.json` | npm audit |
| Vulnerable Python packages (Jinja2, PyYAML, requests) | `worker/requirements.txt` | OSV-Scanner |
