// import fetch from 'node-fetch';
// import cheerio from 'cheerio';
import mysql from 'mysql'


////////////////////////////////////////
//               SQL SERVER
////////////////////////////////////////
var con = mysql.createConnection({
    user: "root",
    database: "test"
});
con.connect();



////////////////////////////////////////
//                 MAIN
////////////////////////////////////////
var array_1 = ["wort1", "wort2"]
var array_2 = ["wert1", "wert2"]
var url = "Die URL"

var command = "(INSERT INTO main(wort_ID, url, wert) VALUES "
// SELECT wort_ID FROM dict where wort =

for (var i = 0; i < array_1.length; i++) {
    command += `(SELECT wort_ID FROM dict WHERE wort = '${array_1[i].replace("'", "\\'")})', '${url}', '${array_2[i].replace("'", "\\'")}'), `
}
command = command.slice(0, -2)

con.query(command, (err) => {
    if (err) throw err
    con.end()
})
