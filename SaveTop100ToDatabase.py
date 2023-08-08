import os
import configparser
import pyodbc
import json

config = configparser.ConfigParser()
config.read('config.ini')
path = 'top100/output.txt'


def sendToDataBase(dataList):
    cnxn = pyodbc.connect(driver=config["mysqlDB"]["driver"],
                          server=config["mysqlDB"]["server"],
                          database=config["mysqlDB"]["database"],
                          trusted_connection=config["mysqlDB"]["trusted_connection"])
    cursor = cnxn.cursor()
    count = 0
    sql = "INSERT INTO " + config["mysqlDB"]["top100List"] + " (ARTIST, DJMAGTOP, IMAGEPATH) VALUES (?,?,?)"
    for data in dataList:
        cursor.execute(sql, data)
        count += 1
    cnxn.commit()
    print("Rows inserted: "+str(count))
    cnxn.close()


with open(path) as file:
    fileData = []
    for line in file:
        json_data = json.loads(line.strip())
        fileData.append((json_data["artist"], json_data["djMagTop"], json_data["imagePath"]))
    sendToDataBase(fileData)

#Select dj.ARTIST, dj.DJMAGTOP, count(tour.ARTIST) as "TOURS", dj.IMAGEPATH from ARTIST_TOURS tour LEFT JOIN DJMAG_TOP_100 dj ON tour.ARTIST = dj.ARTIST GROUP BY dj.ARTIST, dj.DJMAGTOP, dj.IMAGEPATH ORDER BY dj.DJMAGTOP