import json
import csv

with open ("data/geojsonLayer.json") as dataJSON:
	d=json.load(dataJSON)
	print(d[0])