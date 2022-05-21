import express from 'express'
import mysql from 'mysql'
import fs from "fs";

const app = express()
const port = 3004
const pathm = '/home/max/Schreibtisch/Search Browser 1.1'
var part1  = "",
    mode   = "",
    temp   = "",
    params = "",
    links  = "";

fs.readFile(pathm + "/Static/template.html", (err, data) => {
    if (err) throw err;
    part1 = data;
});


////////////////////////////////////////
//          SQL SERVER DECLARATION
////////////////////////////////////////
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "DB_1.0",
    multipleStatements: true
});
con.connect();


////////////////////////////////////////
//               MAIN WEB SERVER
////////////////////////////////////////
app.get('/results', (req, response) => {
    params = (req.query.searchField || "").toLowerCase().split(' ');


    ////////////////////////////////////////
    //           SEARCH OPTION
    ////////////////////////////////////////
    // mode = req.query.option;
    // if (mode = "all") {
        temp = "SELECT URL FROM URLID WHERE UID IN (SELECT UID FROM wordList WHERE WID IN (SELECT WID FROM wordID WHERE word IN ( ? )) ORDER BY value ASC) LIMIT 30"
    // } else if (mode == "wiki") {
    //     temp = "SELECT URL FROM URLID WHERE (UID IN (SELECT UID FROM wordList WHERE WID IN (SELECT WID FROM wordID WHERE word IN ( ? )) ORDER BY value ASC)) AND (special = 1) LIMIT 30";
    // } else {
    //     temp = "SELECT URL FROM URLID WHERE (UID IN (SELECT UID FROM wordList WHERE WID IN (SELECT WID FROM wordID WHERE word IN ( ? )) ORDER BY value ASC)) AND (special = 2) LIMIT 30";
    // }


    // SEARCH FOR WORDS
    con.query(temp, [params],
    function(err, res) {
        if (err) throw err;

        links = "";
        for (var i = 0; i < res.length; i++) {
            links += `<a href="${res[i].URL}">${res[i].URL}</a>`;
        }


        // RETURN THE WEBSITE
        var content =
           part1 +
           links
           '</div>'+
           '</body>';
        response.send(content);
    });
});




////////////////////////////////////////
//         REST OF THE WEBSERVER
////////////////////////////////////////
app.get('/', (req, res) => {
    res.sendFile(pathm + `/index.html`);
});
app.use(express.static(pathm + "/Static"));

app.use((req, res) => {
  res.redirect("/errorPage.html");
});

app.listen(port, (err) => {
    if (err) throw err;
    console.log(`Server listening at port ${port}...`);
});
