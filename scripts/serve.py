#!/usr/bin/env python3
"""Local static server that serves 404.html for missing pages."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import os


ROOT = Path(__file__).resolve().parents[1]
HOST = os.environ.get("HOST", "127.0.0.1")
PORT = int(os.environ.get("PORT", "4173"))


class KorosHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def send_head(self):
        path = self.translate_path(self.path)
        if os.path.isdir(path):
            path = os.path.join(path, "index.html")
        if not os.path.exists(path):
            return self.send_koros_404()
        return super().send_head()

    def send_koros_404(self):
        page = ROOT / "404.html"
        if not page.exists():
            self.send_error(404, "File not found")
            return None
        encoded = page.read_bytes()
        self.send_response(404)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Content-Length", str(len(encoded)))
        self.end_headers()
        return open(page, "rb")


def main():
    server = ThreadingHTTPServer((HOST, PORT), KorosHandler)
    print(f"Serving {ROOT} at http://{HOST}:{PORT}/")
    print("Missing paths return /404.html with HTTP 404.")
    server.serve_forever()


if __name__ == "__main__":
    main()
