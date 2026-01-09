import requests
import os
import time
import random

HEADERS = {
    "User-Agent": "GerboniFetcher/1.1 (contact: arturs.berovskis@inbox.lv)"
}

API_COMMONS = "https://commons.wikimedia.org/w/api.php"
url = "https://lv.wikipedia.org/w/api.php"

directory = "gerbonu_atteli"
os.makedirs(directory, exist_ok=True)

def get_image_url(filename):
    """Return image URL, license, and author info from Commons"""
    if not filename:
        return None
    params = {
        "action": "query",
        "titles": f"File:{filename}",
        "prop": "imageinfo",
        "iiprop": "url|extmetadata",
        "format": "json"
    }
    res = requests.get(API_COMMONS, params=params, headers=HEADERS)
    res.raise_for_status()
    pages = res.json()["query"]["pages"]
    page = next(iter(pages.values()))
    if "imageinfo" not in page:
        return None
    info = page["imageinfo"][0]
    return info["url"]

def get_info():
    params = {
    "action": "parse",
    "pageid": 5184,
    "prop": "wikitext",
    "format": "json"
    }

    res = requests.get(url, params=params, headers=HEADERS)
    data = res.json()
    wikitext = res.json()["parse"]["wikitext"]["*"]
    table = wikitext.split("Admin. iedalījuma<br />vienība")[1].split("|}")[0].replace("|-", "").replace("|", "").replace("[[", "").replace("'", "").strip().split("\n\n")
    newTable = []
    for row in table:
        splits = row.replace("Attēls:", "").split("]]")
        if(".svg" in splits[1]):
            newTable.append([splits[0], splits[1].split(".svg")[0]+".svg"])

    return newTable

def download_image(imagename,filename):
    path = os.path.join(directory, filename+".svg")
    if os.path.exists(path):
        print(f"{filename} Exists already")
        return
    while True:
        try:
            url = get_image_url(imagename.strip())
            if url :
                res = requests.get(url, headers=HEADERS)
                res.raise_for_status()
                break
            else:
                return
        except Exception:
            print("Kļūda, nogaidām")
            time.sleep(60)

    with open(path, "wb") as file:
        file.write(res.content)
    print(f"Downloaded {filename}")
    

table = get_info()
for row in table:
        download_image(row[1], row[0])