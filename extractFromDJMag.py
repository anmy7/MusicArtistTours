import requests
from bs4 import BeautifulSoup
import json
import shutil

url = "https://djmag.com/top100djs"
data = requests.get(url).text

pageSoup = BeautifulSoup(data, 'html.parser')

positions = pageSoup.findAll('div', {'class': 'views-field-field-top100-position'})
names = pageSoup.findAll('div', {'class': 'top100dj-name'})
images = pageSoup.findAll('img')
images.pop(0)
file = open("top100/output.txt", "w")
for name, position, image in zip(names, positions, images):
    res = requests.get("https://djmag.com/"+image.get("src"), stream=True)
    path = "files/"+name.get_text().strip()+".jpg"

    with open(path, "wb") as f:
        shutil.copyfileobj(res.raw, f)

    jsonMessage = {"artist": name.get_text().strip(), "djMagTop": int(position.get_text().strip()), "imagePath": path}
    file.write(json.dumps(jsonMessage)+"\n")
file.close()