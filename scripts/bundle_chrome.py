#!/usr/bin/env python3
"""Собирает partials/*.html в js/site-chrome-html.js (один источник правды для шапки и подвала)."""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PARTIALS = ROOT / "partials"
OUT = ROOT / "js" / "site-chrome-html.js"


def to_js_template(s: str) -> str:
    return s.replace("\\", "\\\\").replace("`", "\\`").replace("${", "\\${")


def main() -> None:
    header = (PARTIALS / "site-header.html").read_text(encoding="utf-8")
    footer = (PARTIALS / "site-footer.html").read_text(encoding="utf-8")
    body = (
        "// Автогенерация: python3 scripts/bundle_chrome.py\n"
        "// Редактируйте partials/site-header.html и partials/site-footer.html\n"
        f"window.__KOROS_HEADER_HTML__ = `{to_js_template(header)}`;\n"
        f"window.__KOROS_FOOTER_HTML__ = `{to_js_template(footer)}`;\n"
    )
    OUT.write_text(body, encoding="utf-8")
    print(f"Wrote {OUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
