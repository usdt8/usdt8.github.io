import re
import os
from urllib.parse import urljoin

BASE_URL = "https://liandian555.xyz/"
FILE_PATH = "liandian_clone/index.html"

try:
    if not os.path.exists(FILE_PATH):
        print(f"Error: {FILE_PATH} not found.")
        exit(1)

    with open(FILE_PATH, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    def make_absolute(match):
        attr = match.group(1) # src, href, action
        quote = match.group(2)
        url = match.group(3)
        
        # Skip absolute and special URLs
        if url.startswith(('http:', 'https:', '//', 'data:', 'javascript:', '#', 'mailto:')):
            return match.group(0)
            
        abs_url = urljoin(BASE_URL, url)
        return f'{attr}={quote}{abs_url}{quote}'

    # Regex for HTML attributes
    pattern = re.compile(r'(src|href|action)=([\"\'])(.*?)([\"\'])', re.IGNORECASE)
    content = pattern.sub(make_absolute, content)

    def make_absolute_css(match):
        url = match.group(1)
        if url.startswith(('http:', 'https:', '//', 'data:')):
            return match.group(0)
        abs_url = urljoin(BASE_URL, url)
        return f'url("{abs_url}")'

    # Regex for CSS url(...)
    css_pattern = re.compile(r'url\([\"\']?(.*?)[\"\']?\)', re.IGNORECASE)
    content = css_pattern.sub(make_absolute_css, content)

    # Specific fix for the faka.js and common.css if needed, 
    # but the generic regex should handle them if they are in standard tags.

    with open(FILE_PATH, 'w', encoding='utf-8') as f:
        f.write(content)

    print("Successfully converted relative URLs to absolute in liandian_clone/index.html")

except Exception as e:
    print(f"Error: {e}")
