const express = require("express");
const sql = require("msnodesqlv8"); 
const config = require("./config");

const app = express ();
app.use(express.json());

const connectionString = `server=${config.sqlConfig.server};Database=${config.sqlConfig.database};Trusted_Connection=${config.sqlConfig.trusted_connection};Driver=${config.sqlConfig.driver}`;

app.get("/api/getTop100Djs", (request, response) => {
    const query = `Select dj.ARTIST, dj.DJMAGTOP, count(tour.ARTIST) as "TOURS", dj.IMAGEPATH from ${config.sqlConfig.tours} tour LEFT JOIN ${config.sqlConfig.top100List} dj ON tour.ARTIST = dj.ARTIST GROUP BY dj.ARTIST, dj.DJMAGTOP, dj.IMAGEPATH ORDER BY dj.DJMAGTOP`

    sql.query(connectionString, query, (err, rows) => {
        response.send(JSON.stringify(rows))
    });
});

app.get("/api/getToursByArtist", (request, response) => {
    const query = `Select ARTIST, FORMAT(DATE, 'dd-MM-yyyy') as DATE, TITLE, VENUE, LOCATION from ${config.sqlConfig.tours} WHERE ARTIST = '${request.query.artist}' ORDER BY DATE`
    sql.query(connectionString, query, (err, rows) => {
        response.send(JSON.stringify(rows))
    });
});

app.listen(config.port, () => {
    console.log("Server Listening on PORT:", config.port);
});