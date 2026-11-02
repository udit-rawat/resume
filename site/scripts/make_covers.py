"""Image assets cut from real project images.

- public/previews/<slug>.webp: full-colour image per project, shown in the hover
  window and on the project page.
- covers-src/dither/<slug>.webp: two-colour Floyd-Steinberg dither of the same
  image (ascii-magic look). Not shipped directly; the designed posters in
  covers-design/covers.html can embed them (Misaanjh does).
- covers-src/dither/misaanjh-ink.png: the Misaanjh photo as ink on transparent.
- public/art/school-of-athens.webp: the hero painting, in colour.

The folder covers themselves are designed posters: see covers-design/covers.html
and scripts/render_covers.sh.

Run:  python3 scripts/make_covers.py
"""

from pathlib import Path
import random

from PIL import Image, ImageOps, ImageEnhance

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "covers-src"
OUT_COVER = ROOT / "covers-src" / "dither"
OUT_PREVIEW = ROOT / "public" / "previews"

COVER_W, COVER_H = 600, 780   # 10:13 portrait, the folder face
DITHER_SCALE = 2              # dither at half size, upscale nearest: chunky print grain

# slug: source file, crop box as fractions (l, t, r, b), paper colour, ink colour, contrast, invert
PROJECTS = {
    "tribunal":     ("tribunal-frame.png", (0.30, 0.12, 0.74, 0.62),   "#EBC3BE", "#A8323A", 1.8, False),
    "planrail":     ("planrail.png",       (0.0, 0.0, 1.0, 1.0),       "#C5CCB6", "#46622F", 1.0, False),
    "muscle-memory":("muscle.png",         (0.0, 0.0, 0.62, 0.62),     "#BCCDE0", "#21498A", 1.5, False),
    "context-lab":  ("contextlab.png",     (0.0, 0.0, 1.0, 1.0),       "#F3DC86", "#7F5E00", 1.0, False),
    "glassbox":     ("glassbox.png",       (0.14, 0.27, 0.46, 0.80),   "#8DCDCB", "#0B5556", 1.8, False),
    "hrm":          ("hrm.png",            (0.0, 0.02, 0.36, 0.36),    "#D5BCE3", "#5E2786", 1.3, False),
    "reposignal":   ("reposignal.jpg",     (0.44, 0.22, 0.98, 0.95),   "#D2D2CD", "#1F1F1F", 1.6, False),
    "animatic":     ("animatic-reel.png",  (0.0, 0.0, 1.0, 1.0),       "#EFA98F", "#962E14", 1.4, True),
    "adamax":       ("adamax.png",         (0.0, 0.0, 1.0, 0.72),       "#262626", "#ECE8DF", 1.6, True),
    "misaanjh":     ("misaanjh.jpg",       (0.15, 0.0, 0.85, 1.0),     "#EFC9D2", "#3B4724", 1.3, False),
}


def hex_rgb(h: str) -> tuple[int, int, int]:
    h = h.lstrip("#")
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))  # type: ignore[return-value]


def crop_frac(im: Image.Image, box) -> Image.Image:
    w, h = im.size
    l, t, r, b = box
    return im.crop((int(l * w), int(t * h), int(r * w), int(b * h)))


def cover(slug: str, src: str, box, paper: str, ink: str, contrast: float, invert: bool) -> None:
    im = Image.open(SRC / src).convert("RGB")
    im = crop_frac(im, box)

    # Full-colour preview for the hover window, same framing as the cover.
    prev = ImageOps.fit(im, (900, 1170), method=Image.Resampling.LANCZOS)
    prev.save(OUT_PREVIEW / f"{slug}.webp", quality=82)

    small = ImageOps.fit(im, (COVER_W // DITHER_SCALE, COVER_H // DITHER_SCALE), method=Image.Resampling.LANCZOS)
    g = ImageOps.grayscale(small)
    g = ImageOps.autocontrast(g, cutoff=1)
    g = ImageEnhance.Contrast(g).enhance(contrast)
    if invert:
        g = ImageOps.invert(g)
    bw = g.convert("1")  # Floyd-Steinberg by default
    bw = bw.resize((COVER_W, COVER_H), Image.Resampling.NEAREST)

    p, k = hex_rgb(paper), hex_rgb(ink)
    out = Image.new("RGB", (COVER_W, COVER_H), p)
    ink_layer = Image.new("RGB", (COVER_W, COVER_H), k)
    mask = ImageOps.invert(bw.convert("L"))  # black pixels in the dither take ink
    out.paste(ink_layer, (0, 0), mask)

    # Light paper grain so flat areas read as printed, not as a flat fill.
    rnd = random.Random(slug)
    px = out.load()
    for _ in range(COVER_W * COVER_H // 90):
        x, y = rnd.randrange(COVER_W), rnd.randrange(COVER_H)
        px[x, y] = k if px[x, y] == p else p

    out.save(OUT_COVER / f"{slug}.webp", quality=88)
    print(f"{slug:14s} <- {src}")


def main() -> None:
    OUT_COVER.mkdir(parents=True, exist_ok=True)
    OUT_PREVIEW.mkdir(parents=True, exist_ok=True)
    for slug, args in PROJECTS.items():
        cover(slug, *args)


if __name__ == "__main__":
    main()


def make_athens() -> None:
    """Raphael's School of Athens (public domain, Wikimedia Commons) in full colour
    for the hero. Centre crop on Plato and Aristotle, 2x the 400 css px it shows at."""
    im = Image.open(SRC / "school-of-athens.jpg").convert("RGB")
    im = crop_frac(im, (0.27, 0.06, 0.73, 0.86))
    w = 800
    h = round(w * im.height / im.width)
    im = im.resize((w, h), Image.Resampling.LANCZOS)
    dest = ROOT / "public" / "art"
    dest.mkdir(parents=True, exist_ok=True)
    im.save(dest / "school-of-athens.webp", quality=84)
    print("athens        <- school-of-athens.jpg", im.size)


def make_ink(slug: str, src: str, box, ink: str, w: int = 380, contrast: float = 1.3) -> None:
    """A photo as dithered ink on a transparent ground, for embedding in a poster."""
    im = crop_frac(Image.open(SRC / src).convert("RGB"), box)
    h = round(w * im.height / im.width)
    g = ImageEnhance.Contrast(ImageOps.autocontrast(ImageOps.grayscale(im.resize((w, h), Image.Resampling.LANCZOS)), cutoff=1)).enhance(contrast)
    alpha = ImageOps.invert(g.convert("1").convert("L"))
    out = Image.new("RGBA", (w, h), hex_rgb(ink) + (0,))
    out.putalpha(alpha)
    out.resize((w * 2, h * 2), Image.Resampling.NEAREST).save(OUT_COVER / f"{slug}-ink.png", optimize=True)
    print(f"{slug}-ink     <- {src}")


if __name__ == "__main__":
    make_athens()
    make_ink("misaanjh", "misaanjh.jpg", (0.22, 0.0, 0.78, 1.0), "#3B4724")
