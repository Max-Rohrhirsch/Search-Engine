// import path from 'path'
import express from 'express'
import mysql from 'mysql'
import fs from "fs";

const app = express()
const port = 3000
const pathm ='/home/max/Schreibtisch/Search Browser'


//---------------------CREATE SQL--------------------------//
var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'testDB',
});




//-------------------------Main SQL Code-------------------
//if param split
//search words in db first 4
//use id to search url
//send new web





// con.connect(function(err) {
//   if (err) throw err;
//   con.query("SELECT ID FROM testDB", function (err, result, fields) {
//     if (err) throw err;
//     console.log(result);
//   });
// });



//-----------------------Create Response--------------------
// var part1 = "";
// fs.readFile("./Static/template.html", (err, data) => {
//    if (err) throw err;
//    part1 = data;
// });


// const content =
//     part1 +
//     '<a href="'+  +'">'+ +'</a>'+
//     '<a href="'+  +'">'+ +'</a>'+
//     '<a href="'+  +'">'+ +'</a>'+
//     '<a href="'+  +'">'+ +'</a>'+
//     '<a href="'+  +'">'+ +'</a>'+
//
//     '</div>'+
//     '</body>';




// ----------------------Web Server------------------------
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
