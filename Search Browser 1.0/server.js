import express from 'express'
import mysql from 'mysql'
import fs from "fs";

const app = express()
const port = 3000
const pathm ='/home/max/Schreibtisch/Search Browser 1.0'
var part1 = "";
var params = "";
var links = "";

fs.readFile("./Static/template.html", (err, data) => {
    if (err) throw err;
    part1 = data;
});


//---------------------SQL Server----------------------
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "DB_1.0",
  multipleStatements: true
});
con.connect();


// -----------------Connect with code in it--------------
function sql(command) {
    con.query(command, function (err, res) {
          if (err) throw err;
          if(res.length){
               for(var i = 0; i<res.length; i++ ){
                    result.push(res[i].URL);
               }
          }

          // CODE   <--------
          var content =
             part1 +
             links
             '</div>'+
             '</body>';
          res.send(content);




      });
}


// ----------------------Main Server------------------------
app.get('/results', (req, res) => {
    params = req.query.searchField.toLowerCase().split(' ');
    forEach((params, wort) => {

    });
        sql('SELECT URL FROM URLID WHERE UID = (SELECT UID FROM wordList WHERE WID = (SELECT WID FROM WordID WHERE word = "'+ wort +'"'+ Rarray ') ORDER BY value ASC);')



    // var content =
    //    part1 +
    //    links
    //    '</div>'+
    //    '</body>';
    // res.send(content);



// 'SELECT URL FROM URLID WHERE UID = (SELECT UID FROM wordList WHERE WID = (SELECT WID FROM WordID WHERE word = "'+ wort +'"));'
    // '<p>'+ +'</p>'+
});


//--------------- Web Server --------------------//
app.get('/', (req, res) => {
    res.sendFile(pathm+`/index.html`);
});
app.use("/Static", express.static("Static"));
app.listen(port, (err) => {
    if (err) {
        console.log(`Error: ${err}`)
    } else {
        console.log(`Server listening at port ${port}...`);
    }
});
con.end()
