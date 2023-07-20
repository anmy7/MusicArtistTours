import os
import configparser
import pyodbc
import json

config = configparser.ConfigParser()
config.read('config.ini')
directory = 'data'


def sendToDataBase(dataList):
    cnxn = pyodbc.connect(driver=config["mysqlDB"]["driver"],
                          server=config["mysqlDB"]["server"],
                          database=config["mysqlDB"]["database"],
                          trusted_connection=config["mysqlDB"]["trusted_connection"])
    cursor = cnxn.cursor()
    count = 0
    sql = "INSERT INTO " + config["mysqlDB"]["table"] + " (ARTIST, TITLE, DATE, VENUE, LOCATION) VALUES (?,?,?,?,?)"
    for data in dataList:
        cursor.execute(sql, data)
        count += 1
    cnxn.commit()
    cnxn.close()


for filename in os.listdir(directory):
    f = os.path.join(directory, filename)
    if os.path.isfile(f):
        with open(f) as file:
            fileData = []
            for line in file:
                artist = list(json.loads(line.strip()).keys())[0]
                json_data = json.loads(line.strip())
                fileData.append((artist, json_data[artist]["title"], json_data[artist]["date"],
                                 json_data[artist]["venue"], json_data[artist]["location"]))
            sendToDataBase(fileData)

