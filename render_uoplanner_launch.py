import math
import subprocess
import wave
from pathlib import Path

import imageio_ffmpeg
import numpy as np
from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parent
WIDTH, HEIGHT, FPS = 1920, 1080, 24
DURATION = 30
FRAMES = FPS * DURATION
RED = (143, 0, 26)
GRAY = (128, 116, 108)
WHITE = (255, 255, 255)
PALE = (246, 244, 242)
INK = (38, 34, 32)
RULE = (211, 207, 204)

GEORGIA = r"C:\Windows\Fonts\georgia.ttf"
GEORGIA_BOLD = r"C:\Windows\Fonts\georgiab.ttf"
SEGOE = r"C:\Windows\Fonts\segoeui.ttf"
SEGOE_BOLD = r"C:\Windows\Fonts\segoeuib.ttf"


def font(path, size):
    return ImageFont.truetype(path, size)


def centered(draw, text, y, face, fill, x_center=WIDTH // 2):
    box = draw.textbbox((0, 0), text, font=face)
    draw.text((x_center - (box[2] - box[0]) / 2, y), text, font=face, fill=fill)


def draw_logo(canvas, x, y, size):
    logo = Image.open(ROOT / "public" / "media" / "uoplannerlogo.png").convert("RGBA")
    logo.thumbnail((size, size), Image.Resampling.LANCZOS)
    canvas.alpha_composite(logo, (int(x - logo.width / 2), int(y - logo.height / 2)))


def draw_grid(draw, x, y, width, height, cols, rows, header=64):
    draw.rectangle((x, y, x + width, y + height), fill=WHITE, outline=RULE, width=2)
    draw.rectangle((x, y, x + width, y + header), fill=PALE)
    for col in range(1, cols):
        cx = x + width * col / cols
        draw.line((cx, y, cx, y + height), fill=RULE, width=2)
    for row in range(1, rows):
        ry = y + header + (height - header) * row / rows
        draw.line((x, ry, x + width, ry), fill=RULE, width=2)


def draw_shot_one(canvas, t):
    draw = ImageDraw.Draw(canvas)
    canvas.paste(RED, (0, 0, WIDTH, HEIGHT))
    draw.rectangle((92, 82, WIDTH - 92, HEIGHT - 82), outline=(255, 255, 255, 75), width=2)
    draw_logo(canvas, WIDTH // 2, 400, 250)
    draw.line((220, 680, WIDTH - 220, 680), fill=(255, 255, 255), width=2)
    alpha = int(255 * min(1, max(0, (t - 1.05) / 0.7)))
    title = Image.new("RGBA", (WIDTH, 270), (0, 0, 0, 0))
    td = ImageDraw.Draw(title)
    td.text((228, 15), "University of Ottawa", font=font(GEORGIA_BOLD, 74), fill=(255, 255, 255, alpha))
    td.text((228, 107), "Planner", font=font(GEORGIA_BOLD, 92), fill=(255, 255, 255, alpha))
    canvas.alpha_composite(title, (0, 710))
    draw.rectangle((228, 983, 350, 991), fill=WHITE)


def draw_shot_two(canvas, t):
    draw = ImageDraw.Draw(canvas)
    canvas.paste(WHITE, (0, 0, WIDTH, HEIGHT))
    draw.text((130, 105), "THE SEARCH, BY HAND", font=font(SEGOE_BOLD, 22), fill=RED)
    draw.line((130, 151, WIDTH - 130, 151), fill=RULE, width=2)
    draw.text((130, 192), "Searching uoZone by hand,", font=font(GEORGIA_BOLD, 64), fill=INK)
    draw.text((130, 270), "course by course.", font=font(GEORGIA_BOLD, 64), fill=INK)
    start_y = 440
    for index in range(5):
        offset = (1 - min(1, max(0, (t - index * 0.45) / 0.4))) * 95
        left = int(130 + offset)
        top = start_y + index * 96
        draw.rectangle((left, top, 1615, top + 66), fill=PALE, outline=RULE, width=2)
        draw.rectangle((left + 26, top + 25, left + 240 + (index % 2) * 90, top + 31), fill=GRAY)
        draw.rectangle((left + 261, top + 25, left + 410, top + 31), fill=(199, 193, 188))
        draw.rectangle((1515, top + 17, 1575, top + 49), fill=RED)
    cursor_x = 1674 + math.sin(t * 2) * 28
    cursor_y = 477 + (t % 2.4) * 148
    draw.polygon(
        [(cursor_x, cursor_y), (cursor_x + 60, cursor_y + 103), (cursor_x + 65, cursor_y + 70),
         (cursor_x + 94, cursor_y + 100), (cursor_x + 111, cursor_y + 83),
         (cursor_x + 79, cursor_y + 54), (cursor_x + 109, cursor_y + 45)],
        fill=RED,
    )


def draw_shot_three(canvas, t):
    draw = ImageDraw.Draw(canvas)
    canvas.paste(PALE, (0, 0, WIDTH, HEIGHT))
    draw.rectangle((0, 0, 38, HEIGHT), fill=RED)
    draw.text((132, 112), "YOUR STARTING POINT", font=font(SEGOE_BOLD, 22), fill=RED)
    draw.text((132, 194), "Enter your program of study", font=font(GEORGIA_BOLD, 57), fill=INK)
    draw.text((132, 265), "and your year of study.", font=font(GEORGIA_BOLD, 57), fill=INK)
    fields = [
        ("PROGRAM OF STUDY", 445, "Your program"),
        ("YEAR OF STUDY", 650, "Your year"),
    ]
    for label, top, placeholder in fields:
        draw.text((154, top), label, font=font(SEGOE_BOLD, 20), fill=GRAY)
        draw.rectangle((150, top + 38, 1770, top + 132), fill=WHITE, outline=RULE, width=2)
        draw.text((184, top + 60), placeholder, font=font(SEGOE, 32), fill=(178, 172, 168))
        reveal = min(1, max(0, (t - (top - 445) / 500) / 1.2))
        marker_x = int(1675 + 56 * reveal)
        draw.rectangle((marker_x, top + 62, marker_x + 6, top + 107), fill=RED)


def draw_shot_four(canvas, t):
    draw = ImageDraw.Draw(canvas)
    canvas.paste(WHITE, (0, 0, WIDTH, HEIGHT))
    draw.text((110, 82), "A WEEK, BUILT AROUND YOUR COURSES", font=font(SEGOE_BOLD, 22), fill=RED)
    draw.text((110, 130), "Every possible schedule,", font=font(GEORGIA_BOLD, 61), fill=INK)
    draw.text((110, 206), "built from your courses.", font=font(GEORGIA_BOLD, 61), fill=INK)
    x, y, width, height = 110, 355, 1700, 590
    draw_grid(draw, x, y, width, height, 6, 6, 74)
    days = ["", "MON", "TUE", "WED", "THU", "FRI"]
    for col, day in enumerate(days):
        if day:
            draw.text((x + width * col / 6 + 34, y + 23), day, font=font(SEGOE_BOLD, 19), fill=GRAY)
    blocks = [
        (1, 0, 1), (1, 2, 2), (2, 1, 2), (2, 4, 1), (3, 0, 2), (3, 3, 1),
        (4, 2, 2), (4, 5, 1), (5, 1, 1), (5, 3, 2), (5, 5, 1),
    ]
    progress = min(1, max(0, (t - 0.4) / 4))
    for index, (day, slot, span) in enumerate(blocks):
        if progress * len(blocks) <= index:
            continue
        col_width = width / 6
        cell_height = (height - 74) / 6
        bx = x + day * col_width + 16
        by = y + 74 + slot * cell_height + 13
        bw = col_width - 32
        bh = span * cell_height - 25
        color = RED if index % 3 == 0 else (228, 224, 221)
        draw.rectangle((bx, by, bx + bw, by + bh), fill=color)
        draw.rectangle((bx, by, bx + 8, by + bh), fill=GRAY if color == RED else RED)
    draw.line((x, 984, x + width, 984), fill=RULE, width=2)
    draw.text((x, 1003), "COURSES IN. POSSIBLE WEEKS OUT.", font=font(SEGOE_BOLD, 16), fill=GRAY)


def draw_shot_five(canvas, t):
    draw = ImageDraw.Draw(canvas)
    canvas.paste(RED, (0, 0, WIDTH, HEIGHT))
    draw.text((130, 95), "COMPARE YOUR OPTIONS", font=font(SEGOE_BOLD, 22), fill=WHITE)
    draw.line((130, 143, WIDTH - 130, 143), fill=(255, 255, 255), width=2)
    card_y, card_h, card_w, gap = 264, 500, 450, 62
    start_x = (WIDTH - (card_w * 3 + gap * 2)) // 2
    for option in range(3):
        cx = start_x + option * (card_w + gap)
        selected = option == 1
        fill = WHITE if selected else (143, 0, 26)
        outline = WHITE
        draw.rectangle((cx, card_y, cx + card_w, card_y + card_h), fill=fill, outline=outline, width=3)
        for day in range(3):
            for block in range(3):
                if (day * 2 + block + option) % 3 == 1:
                    bx = cx + 42 + day * 124
                    by = card_y + 75 + block * 110
                    bh = 70 + 18 * ((day + block) % 2)
                    block_fill = RED if selected else (255, 255, 255)
                    draw.rectangle((bx, by, bx + 88, by + bh), fill=block_fill)
        if selected:
            draw.rectangle((cx, card_y + card_h, cx + card_w, card_y + card_h + 9), fill=WHITE)
    centered(draw, "Pick the one that works best for you.", 858, font(GEORGIA_BOLD, 52), WHITE)


def draw_shot_six(canvas, t):
    draw = ImageDraw.Draw(canvas)
    canvas.paste(WHITE, (0, 0, WIDTH, HEIGHT))
    draw.rectangle((0, 0, 28, HEIGHT), fill=RED)
    draw.text((132, 136), "Free to use. We only make money", font=font(SEGOE, 34), fill=GRAY)
    draw.text((132, 184), "from occasional ads.", font=font(SEGOE, 34), fill=GRAY)
    draw.line((132, 265, WIDTH - 132, 265), fill=RULE, width=2)
    draw.text((132, 355), "Your schedule,", font=font(GEORGIA_BOLD, 86), fill=RED)
    draw.text((132, 458), "your success", font=font(GEORGIA_BOLD, 86), fill=RED)
    draw.rectangle((132, 614, 520, 712), fill=RED)
    draw.text((178, 640), "Try it now!", font=font(SEGOE_BOLD, 40), fill=WHITE)
    draw_logo(canvas, 1560, 778, 255)


SHOTS = [
    (0, 4, draw_shot_one),
    (4, 9, draw_shot_two),
    (9, 15, draw_shot_three),
    (15, 21, draw_shot_four),
    (21, 25, draw_shot_five),
    (25, 30, draw_shot_six),
]


def draw_frame(t):
    for start, end, renderer in SHOTS:
        if start <= t < end or (t == 30 and end == 30):
            canvas = Image.new("RGBA", (WIDTH, HEIGHT), WHITE + (255,))
            renderer(canvas, t - start)
            break
    else:
        canvas = Image.new("RGBA", (WIDTH, HEIGHT), WHITE + (255,))
        draw_shot_six(canvas, 5)

    transition = 0.42
    scene_start = max(start for start, end, _ in SHOTS if start <= t < end)
    local_time = t - scene_start
    if scene_start > 0 and local_time < transition:
        progress = min(1, local_time / transition)
        half = int((1 - progress) * WIDTH / 2)
        draw = ImageDraw.Draw(canvas)
        draw.rectangle((0, 0, half, HEIGHT), fill=RED)
        draw.rectangle((WIDTH - half, 0, WIDTH, HEIGHT), fill=RED)
        draw.rectangle((half - 3, 0, half + 3, HEIGHT), fill=GRAY)
        draw.rectangle((WIDTH - half - 3, 0, WIDTH - half + 3, HEIGHT), fill=GRAY)
    return canvas.convert("RGB")


def make_music(path):
    sample_rate = 48000
    count = sample_rate * DURATION
    time = np.arange(count, dtype=np.float64) / sample_rate
    music = np.zeros(count, dtype=np.float64)
    chord_roots = [130.81, 146.83, 164.81, 110.0, 130.81, 146.83, 164.81, 196.0]
    chord_duration = 3.75
    for index, root in enumerate(chord_roots):
        start = int(index * chord_duration * sample_rate)
        stop = min(count, int((index + 1) * chord_duration * sample_rate))
        local = np.arange(stop - start, dtype=np.float64) / sample_rate
        envelope = np.minimum(1, local / 0.8) * np.minimum(1, (chord_duration - local) / 0.9)
        frequencies = (root, root * 1.25, root * 1.5, root * 2)
        chord = sum(
            np.sin(2 * math.pi * frequency * local + index * 0.13) / (harmonic + 1)
            for harmonic, frequency in enumerate(frequencies)
        ) / 2.08
        music[start:stop] += chord * envelope * 0.11

    for beat in np.arange(0.35, DURATION, 0.75):
        start = int(beat * sample_rate)
        length = int(0.52 * sample_rate)
        stop = min(count, start + length)
        local = np.arange(stop - start, dtype=np.float64) / sample_rate
        note = 523.25 if int(beat / 0.75) % 4 in (0, 2) else 392.0
        music[start:stop] += (
            np.sin(2 * math.pi * note * local)
            * np.exp(-local * 7)
            * 0.055
        )

    fade = int(sample_rate * 1.1)
    music[:fade] *= np.linspace(0, 1, fade)
    music[-fade:] *= np.linspace(1, 0, fade)
    stereo = np.column_stack((music, np.roll(music, int(sample_rate * 0.009))))
    pcm = np.clip(stereo * 32767, -32768, 32767).astype("<i2")
    with wave.open(str(path), "wb") as output:
        output.setnchannels(2)
        output.setsampwidth(2)
        output.setframerate(sample_rate)
        output.writeframes(pcm.tobytes())


def render():
    output_path = ROOT / "launch.mp4"
    audio_path = ROOT / "launch_music.wav"
    make_music(audio_path)
    ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
    command = [
        ffmpeg, "-y", "-hide_banner", "-loglevel", "error",
        "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{WIDTH}x{HEIGHT}",
        "-r", str(FPS), "-i", "pipe:0",
        "-i", str(audio_path),
        "-map", "0:v:0", "-map", "1:a:0",
        "-c:v", "libx264", "-preset", "medium", "-crf", "18",
        "-pix_fmt", "yuv420p",
        "-c:a", "aac", "-b:a", "192k", "-shortest",
        "-movflags", "+faststart", str(output_path),
    ]
    process = subprocess.Popen(command, stdin=subprocess.PIPE)
    try:
        for frame_index in range(FRAMES):
            frame = draw_frame(frame_index / FPS)
            process.stdin.write(frame.tobytes())
            if frame_index % (FPS * 5) == 0:
                print(f"Rendered {frame_index // FPS:02d}/{DURATION:02d} seconds", flush=True)
    finally:
        process.stdin.close()
    result = process.wait()
    audio_path.unlink(missing_ok=True)
    if result:
        raise subprocess.CalledProcessError(result, command)
    print(f"Created {output_path} ({WIDTH}x{HEIGHT}, {FPS}fps, {DURATION}s)")


if __name__ == "__main__":
    render()
