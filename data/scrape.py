import os
import re
import json
import urllib.request
from urllib.parse import urljoin, urlparse

BASE_URL = "https://sam.kiut.uz"
DATA_DIR = "/home/farrukh/kiut-samarkand-data"
MEDIA_DIR = os.path.join(DATA_DIR, "media")
PAGES_DIR = os.path.join(DATA_DIR, "raw_pages")

os.makedirs(MEDIA_DIR, exist_ok=True)
os.makedirs(PAGES_DIR, exist_ok=True)

headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}

def fetch(url):
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req, timeout=15) as resp:
        return resp.read()

def download_media(url, target_dir):
    try:
        parsed = urlparse(url)
        filename = os.path.basename(parsed.path)
        if not filename:
            return None
        # sanitize filename
        filename = re.sub(r'[^a-zA-Z0-9_\-\.]', '_', filename)
        dest_path = os.path.join(target_dir, filename)
        if os.path.exists(dest_path) and os.path.getsize(dest_path) > 0:
            return filename
        data = fetch(url)
        with open(dest_path, "wb") as f:
            f.write(data)
        return filename
    except Exception as e:
        print(f"Error downloading {url}: {e}")
        return None

# Step 1: Discover all relevant URLs
languages = ["uz", "ru", "en"]
visited_urls = set()
to_visit = [f"{BASE_URL}/{lang}/" for lang in languages]
all_media_urls = set()
site_data = {
    "languages": languages,
    "pages": {},
    "media": []
}

while to_visit:
    url = to_visit.pop(0)
    if url in visited_urls:
        continue
    visited_urls.add(url)
    
    try:
        print(f"Fetching: {url}")
        content = fetch(url).decode("utf-8", errors="ignore")
        
        # Save raw html
        path_name = urlparse(url).path.strip("/").replace("/", "__") or "home"
        with open(os.path.join(PAGES_DIR, f"{path_name}.html"), "w", encoding="utf-8") as f:
            f.write(content)

        # Find media
        img_srcs = re.findall(r'<img[^>]+src=[\x22\x27]([^\x22\x27>]+)[\x22\x27]', content, re.IGNORECASE)
        bg_imgs = re.findall(r'url\([\x22\x27]?([^\x22\x27\)]+)[\x22\x27]?\)', content, re.IGNORECASE)
        for m in img_srcs + bg_imgs:
            if not m.startswith("data:"):
                full_m = urljoin(url, m)
                if any(full_m.lower().endswith(ext) for ext in [".jpg", ".jpeg", ".png", ".svg", ".webp", ".gif", ".ico", ".pdf"]):
                    all_media_urls.add(full_m)

        # Find more internal links
        links = re.findall(r'href=[\x22\x27](/[^\x22\x27>#]+|https?://sam\.kiut\.uz/[^\x22\x27>#]+)[\x22\x27]', content)
        for link in links:
            clean_link = urljoin(url, link).split("?")[0].split("#")[0]
            if urlparse(clean_link).netloc in ("sam.kiut.uz", ""):
                if not clean_link.endswith((".css", ".js", ".ico", ".png", ".jpg", ".svg", ".pdf")):
                    if clean_link not in visited_urls and clean_link not in to_visit:
                        # Limit to interesting sections
                        if any(k in clean_link for k in ["/uz/", "/ru/", "/en/"]):
                            to_visit.append(clean_link)
                            
    except Exception as e:
        print(f"Error fetching {url}: {e}")

print(f"Total pages crawled: {len(visited_urls)}")
print(f"Total media files found: {len(all_media_urls)}")

# Step 2: Download media files
downloaded = {}
for m_url in all_media_urls:
    fname = download_media(m_url, MEDIA_DIR)
    if fname:
        downloaded[m_url] = fname

with open(os.path.join(DATA_DIR, "media_map.json"), "w", encoding="utf-8") as f:
    json.dump(downloaded, f, ensure_ascii=False, indent=2)

print(f"Media downloaded: {len(downloaded)} files.")
