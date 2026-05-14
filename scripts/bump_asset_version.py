#!/usr/bin/env python3
"""Add a deploy version query to local asset references."""

from __future__ import annotations

import argparse
import re
from datetime import datetime, timezone
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
VERSIONED_PREFIXES = ("assets/", "css/", "images/", "js/", "site.webmanifest")
VERSIONED_EXTENSIONS = (
    ".css",
    ".gif",
    ".ico",
    ".jpeg",
    ".jpg",
    ".js",
    ".mp4",
    ".pdf",
    ".png",
    ".svg",
    ".webmanifest",
    ".webp",
)

ASSET_RE = re.compile(
    r'(?P<prefix>\b(?:data-src|href|src)=["\'])'
    r'(?P<path>/(?:assets|css|images|js)/[^"\']+?|/site\.webmanifest)'
    r'(?:\?v=[^"\']*)?'
    r'(?P<suffix>["\'])'
)


def iter_versioned_files() -> list[Path]:
    ignored_parts = {".git", "node_modules"}
    return sorted(
        path
        for path in [*ROOT.rglob("*.html"), *ROOT.rglob("*.js")]
        if not ignored_parts.intersection(path.relative_to(ROOT).parts)
    )


def should_version(asset_path: str) -> bool:
    normalized = asset_path[1:] if asset_path.startswith("/") else asset_path
    return normalized.startswith(VERSIONED_PREFIXES) and normalized.lower().endswith(VERSIONED_EXTENSIONS)


def update_file(path: Path, version: str) -> bool:
    original = path.read_text(encoding="utf-8")
    updated = ASSET_RE.sub(
        lambda match: (
            f"{match.group('prefix')}{match.group('path')}?v={version}{match.group('suffix')}"
            if should_version(match.group("path"))
            else match.group(0)
        ),
        original,
    )
    if updated == original:
        return False
    path.write_text(updated, encoding="utf-8")
    return True


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "version",
        nargs="?",
        default=datetime.now(timezone.utc).strftime("%Y%m%d%H%M%S"),
        help="Version string for local asset URLs. Defaults to UTC timestamp.",
    )
    args = parser.parse_args()

    changed = [path.relative_to(ROOT) for path in iter_versioned_files() if update_file(path, args.version)]
    for path in changed:
        print(f"versioned {path}")
    print(f"asset version: {args.version}")


if __name__ == "__main__":
    main()
