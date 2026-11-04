import os
import json
import re
from bs4 import BeautifulSoup

DATA_DIR = "/home/farrukh/kiut-samarkand-data"
PAGES_DIR = os.path.join(DATA_DIR, "raw_pages")

def clean_text(text):
    if not text:
        return ""
    return re.sub(r'\s+', ' ', text).strip()

def parse_home_page(lang):
    filename = os.path.join(PAGES_DIR, f"{lang}.html")
    if not os.path.exists(filename):
        return {}
    
    with open(filename, "r", encoding="utf-8") as f:
        soup = BeautifulSoup(f.read(), "html.parser")
    
    data = {}
    
    # Title & Hero
    title = soup.find("title")
    data["title"] = clean_text(title.text) if title else ""
    
    # Hero slider slides
    slides = []
    carousel_items = soup.find_all("div", class_=re.compile(r"item|slide|carousel", re.I))
    for item in soup.find_all("div", class_="owl-item"):
        h1 = item.find(["h1", "h2", "h3"])
        p = item.find("p")
        img = item.find("img")
        if h1 or img:
            slides.append({
                "title": clean_text(h1.text) if h1 else "",
                "description": clean_text(p.text) if p else "",
                "image": img.get("src") if img else ""
            })
    data["hero_slides"] = slides

    # Stats / Counters
    stats = []
    for stat_div in soup.find_all(["div", "section"], class_=re.compile(r"stat|count|counter|number", re.I)):
        num = stat_div.find(class_=re.compile(r"num|digit|value", re.I)) or stat_div.find(["h2", "h3", "span"])
        lbl = stat_div.find(class_=re.compile(r"label|text|title", re.I)) or stat_div.find("p")
        if num and lbl:
            stats.append({
                "number": clean_text(num.text),
                "label": clean_text(lbl.text)
            })
    data["stats"] = stats

    # Schools / Faculties from home
    schools = []
    for a in soup.find_all("a", href=re.compile(r"/dasturlar/school/|/programmy/school/|/programs/school/")):
        name = clean_text(a.text)
        href = a.get("href")
        if name and href:
            schools.append({"name": name, "url": href})
    data["schools"] = schools

    return data

result = {
    "uz": parse_home_page("uz"),
    "ru": parse_home_page("ru"),
    "en": parse_home_page("en")
}

out_file = os.path.join(DATA_DIR, "extracted_home.json")
with open(out_file, "w", encoding="utf-8") as f:
    json.dump(result, f, ensure_ascii=False, indent=2)

print(f"Extracted content saved to: {out_file}")
