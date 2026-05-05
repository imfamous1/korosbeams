#!/usr/bin/env python3
"""Сборка страниц из экспорта Stitch «Корос под разработку»."""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

LINK = "text-zinc-600 dark:text-zinc-400 font-medium hover:text-[#725c00] dark:hover:text-[#ffd100] transition-colors duration-300"
ACTIVE = "text-[#725c00] dark:text-[#ffd100] border-b-2 border-[#ffd100] pb-1 font-bold font-headline"


def build_nav(active: str) -> str:
    p = LINK
    s = LINK
    a = LINK
    m = LINK
    if active == "catalog":
        p = ACTIVE
    elif active == "manufacturing":
        m = ACTIVE
    elif active == "home":
        pass

    if active == "contact":
        c_desktop = (
            '<a class="text-[#725c00] border-b-2 border-[#ffd100] pb-1 font-headline font-bold tracking-tight '
            'hidden md:inline" href="/contact/" aria-current="page">Contact/Inquiry</a>'
        )
        c_mobile_btn = ""
    else:
        c_desktop = (
            '<a class="bg-primary-container text-on-primary-container px-6 py-2 font-bold font-headline '
            'rounded-lg active:scale-95 transition-transform hover:shadow-lg inline-flex items-center justify-center" '
            'href="/contact/">Contact/Inquiry</a>'
        )
        c_mobile_btn = ""

    return f"""<nav class="fixed top-0 w-full z-50 bg-surface/80 dark:bg-zinc-900/80 backdrop-blur-xl tonal-shift bg-surface-container-low/80 dark:bg-zinc-800/50" aria-label="Main">
<div class="flex justify-between items-center px-4 sm:px-8 py-4 max-w-[1440px] mx-auto">
<div class="flex items-center gap-4 md:gap-8 min-w-0">
<a class="bg-[#ffd100] text-black px-4 py-1 font-black tracking-tighter text-xl font-headline shrink-0" href="/">Koros</a>
<div class="hidden md:flex items-center gap-6">
<a class="{p}" href="/catalog/"{(' aria-current="page"' if active == 'catalog' else '')}>Products</a>
<a class="{s}" href="/#features">Solutions</a>
<a class="{a}" href="/manufacturing/">About Us</a>
<a class="{m}" href="/manufacturing/#production"{(' aria-current="page"' if active == 'manufacturing' else '')}>Manufacturing</a>
</div>
</div>
<div class="flex items-center gap-2 md:gap-4">
{c_desktop}{c_mobile_btn}
<button type="button" class="md:hidden p-2 text-on-surface rounded-lg hover:bg-surface-container-high" aria-expanded="false" aria-controls="site-mobile-nav" data-nav-toggle>
<span class="material-symbols-outlined" aria-hidden="true">menu</span>
</button>
</div>
</div>
<div id="site-mobile-nav" class="hidden fixed inset-0 top-[64px] z-40 bg-background border-t border-surface-container-highest overflow-y-auto md:hidden" data-nav-panel>
<div class="flex flex-col gap-1 p-6 pb-24">
<a class="py-3 text-lg font-headline font-semibold border-b border-surface-container-high" href="/catalog/">Products</a>
<a class="py-3 text-lg font-headline font-semibold border-b border-surface-container-high" href="/#features">Solutions</a>
<a class="py-3 text-lg font-headline font-semibold border-b border-surface-container-high" href="/manufacturing/">About Us</a>
<a class="py-3 text-lg font-headline font-semibold border-b border-surface-container-high" href="/manufacturing/#production">Manufacturing</a>
<a class="mt-4 bg-primary-container text-on-primary-container px-6 py-3 font-bold font-headline rounded-lg text-center" href="/contact/">Contact / Inquiry</a>
</div>
</div>
</nav>"""


def strip_old_nav(html: str) -> str:
    for pat in (
        r"<!-- TopNavBar -->.*?</nav>",
        r"<!-- Top Navigation Bar -->.*?</nav>",
    ):
        m = re.search(pat, html, flags=re.DOTALL)
        if m:
            return html[: m.start()] + "__INSERT_NAV__" + html[m.end() :]
    raise RuntimeError("nav not found")


def fix_footer(html: str) -> str:
    pairs = [
        ('href="#">H20 Beams</a>', 'href="/catalog/">H20 Beams</a>'),
        ('href="#">H20 Timber Beams</a>', 'href="/catalog/">H20 Timber Beams</a>'),
        ('href="#">H20 Timber Beams</a>', 'href="/catalog/">H20 Timber Beams</a>'),
        ('href="#">Plywood Systems</a>', 'href="/catalog/">Plywood Systems</a>'),
        ('href="#">Accessories</a>', 'href="/catalog/">Accessories</a>'),
        ('href="#">Scaffolding</a>', 'href="/catalog/">Scaffolding</a>'),
        ('href="#">Technical Data</a>', 'href="/catalog/">Technical Data</a>'),
        ('href="#">Installation Guide</a>', 'href="/manufacturing/">Installation Guide</a>'),
        ('href="#">Safety Protocols</a>', 'href="/manufacturing/#quality">Safety Protocols</a>'),
        ('href="#">Contact</a>', 'href="/contact/">Contact</a>'),
        ('href="#">Steel Connectors</a>', 'href="/catalog/">Steel Connectors</a>'),
        ('href="#">Formwork Systems</a>', 'href="/catalog/">Formwork Systems</a>'),
        ('href="#">Certifications</a>', 'href="/manufacturing/#quality">Certifications</a>'),
        ('href="#">Steel Walings</a>', 'href="/catalog/">Steel Walings</a>'),
        ('href="#">Slab Formwork</a>', 'href="/catalog/">Slab Formwork</a>'),
        ('href="#">Climbing Systems</a>', 'href="/catalog/">Climbing Systems</a>'),
        ('href="#">Assembly Guides</a>', 'href="/manufacturing/">Assembly Guides</a>'),
        ('href="#">Case Studies</a>', 'href="/">Case Studies</a>'),
    ]
    for a, b in pairs:
        html = html.replace(a, b)
    html = html.replace(
        'hover:translate-x-1 transition-transform duration-200 block" href="#">Products</a>',
        'hover:translate-x-1 transition-transform duration-200 block" href="/catalog/">Products</a>',
    )
    html = html.replace(
        'hover:translate-x-1 transition-transform duration-200 block" href="#">Solutions</a>',
        'hover:translate-x-1 transition-transform duration-200 block" href="/#features">Solutions</a>',
    )
    html = html.replace(
        'hover:translate-x-1 transition-transform duration-200 block" href="#">Manufacturing</a>',
        'hover:translate-x-1 transition-transform duration-200 block" href="/manufacturing/#production">Manufacturing</a>',
    )
    html = html.replace(
        'hover:translate-x-1 transition-transform duration-200" href="#">Products</a>',
        'hover:translate-x-1 transition-transform duration-200" href="/catalog/">Products</a>',
    )
    html = html.replace(
        'hover:translate-x-1 transition-transform duration-200" href="#">Solutions</a>',
        'hover:translate-x-1 transition-transform duration-200" href="/#features">Solutions</a>',
    )
    html = html.replace(
        'hover:translate-x-1 transition-transform duration-200" href="#">Manufacturing</a>',
        'hover:translate-x-1 transition-transform duration-200" href="/manufacturing/#production">Manufacturing</a>',
    )
    html = html.replace(
        '<span class="text-[#ffd100] font-black text-2xl tracking-tighter mb-4 block font-headline">Koros Industrial.</span>',
        '<a href="/" class="text-[#ffd100] font-black text-2xl tracking-tighter mb-4 block font-headline">Koros Industrial.</a>',
    )
    html = html.replace(
        '<span class="text-[#ffd100] font-black text-2xl tracking-tighter mb-4 block">Koros Industrial</span>',
        '<a href="/" class="text-[#ffd100] font-black text-2xl tracking-tighter mb-4 block font-headline">Koros Industrial</a>',
    )
    return html


def add_script(html: str) -> str:
    if "js/main.js" in html:
        return html
    return html.replace("</body>", '  <script src="/js/main.js" defer></script>\n</body>')


def patch_index(html: str) -> str:
    html = html.replace(
        '<section class="py-24 bg-surface-container-low">',
        '<section id="features" class="py-24 bg-surface-container-low">',
        1,
    )
    html = html.replace(
        '<button class="px-8 py-4 bg-primary text-on-primary font-bold font-headline rounded-lg flex items-center gap-3 hover:bg-primary/90 transition-all shadow-xl">\n                            Explore Catalog\n                            <span class="material-symbols-outlined">arrow_forward</span>\n</button>',
        '<a href="/catalog/" class="px-8 py-4 bg-primary text-on-primary font-bold font-headline rounded-lg flex items-center gap-3 hover:bg-primary/90 transition-all shadow-xl">\n                            Explore Catalog\n                            <span class="material-symbols-outlined">arrow_forward</span>\n</a>',
    )
    html = html.replace(
        '<button class="px-8 py-4 bg-surface-container-highest text-on-surface font-bold font-headline rounded-lg border border-outline-variant hover:bg-white transition-all">\n                            Request a Quote\n                        </button>',
        '<a href="/contact/" class="px-8 py-4 bg-surface-container-highest text-on-surface font-bold font-headline rounded-lg border border-outline-variant hover:bg-white transition-all inline-flex items-center justify-center">\n                            Request a Quote\n                        </a>',
    )
    html = html.replace(
        '<button class="mt-12 text-primary font-bold flex items-center gap-2 group">\n                            Full technical specifications \n                            <span class="material-symbols-outlined group-hover:translate-x-2 transition-transform">arrow_right_alt</span>\n</button>',
        '<a href="/catalog/" class="mt-12 text-primary font-bold flex items-center gap-2 group">\n                            Full technical specifications \n                            <span class="material-symbols-outlined group-hover:translate-x-2 transition-transform">arrow_right_alt</span>\n</a>',
    )
    return html


def patch_manufacturing(html: str) -> str:
    html = html.replace(
        '<section class="relative h-[819px] flex items-end overflow-hidden">',
        '<section id="production" class="relative h-[819px] flex items-end overflow-hidden">',
        1,
    )
    html = html.replace(
        "<!-- Technical Specification Section (Engineer's Desk Style) -->\n<section class=\"bg-surface-container-highest py-24 px-8\">",
        "<!-- Technical Specification Section (Engineer's Desk Style) -->\n<section id=\"quality\" class=\"bg-surface-container-highest py-24 px-8\">",
        1,
    )
    html = html.replace(
        '<button class="bg-white text-primary px-8 py-4 font-headline font-black rounded-lg hover:scale-105 transition-transform flex items-center gap-2 shadow-xl">\n<span class="material-symbols-outlined">download</span>\n                        PDF CATALOG\n                    </button>',
        '<a href="/catalog/" class="bg-white text-primary px-8 py-4 font-headline font-black rounded-lg hover:scale-105 transition-transform flex items-center gap-2 shadow-xl">\n<span class="material-symbols-outlined">download</span>\n                        PDF CATALOG\n                    </a>',
    )
    return html


def patch_catalog(html: str) -> str:
    html = html.replace(
        '<button class="w-full py-4 bg-surface-container-high text-on-surface font-bold text-sm hover:bg-primary-container hover:text-on-primary-container transition-colors duration-300">\n                            View Details\n                        </button>\n</div>\n</div>\n</div>\n<!-- Product Card 2 -->',
        '<a href="/catalog/" class="w-full py-4 bg-surface-container-high text-on-surface font-bold text-sm hover:bg-primary-container hover:text-on-primary-container transition-colors duration-300 flex items-center justify-center">\n                            View Details\n                        </a>\n</div>\n</div>\n</div>\n<!-- Product Card 2 -->',
        1,
    )
    return html


def ensure_catalog_title(html: str) -> str:
    if re.search(r"<title>[^<]+</title>", html):
        return html
    return html.replace("<head>", "<head>\n<title>Catalog | Koros Industrial</title>", 1)


def run():
    pages = [
        ("_raw-home.html", "index.html", "home", patch_index),
        ("_raw-catalog.html", "catalog/index.html", "catalog", lambda h: patch_catalog(ensure_catalog_title(h))),
        ("_raw-manufacturing.html", "manufacturing/index.html", "manufacturing", patch_manufacturing),
        ("_raw-contact.html", "contact/index.html", "contact", None),
    ]
    for raw_name, out_name, active, patcher in pages:
        raw = (ROOT / raw_name).read_text(encoding="utf-8")
        raw = strip_old_nav(raw)
        raw = raw.replace("__INSERT_NAV__", build_nav(active))
        raw = fix_footer(raw)
        if patcher:
            raw = patcher(raw)
        raw = add_script(raw)
        out = ROOT / out_name
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(raw, encoding="utf-8")
        print("wrote", out_name)


if __name__ == "__main__":
    run()
