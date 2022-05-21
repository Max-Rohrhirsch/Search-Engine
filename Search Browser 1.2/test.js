import fetch from 'node-fetch';
import cheerio from 'cheerio';
import mysql from 'mysql'

// var con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     database: "DB_1.0",
//     multipleStatements: true
// });
// con.connect();


// INSERT INTO MyTable (Name)
// SELECT  NewNames.Name
// FROM    ( VALUES ('Name1'), ('Name2'), ('Name3') ) AS NewNames (Name)
// WHERE   NOT EXISTS ( SELECT 1
//                      FROM   MyTable AS MT
//                      WHERE  MT.Name = NewNames.Name );
var dict = {
    'a': 'aa',
    'b': 'bb'
}
var array = Object.keys(dict)
var i, j, temp, chunk = 5;
for (i = 0,j = array.length; i < j; i += chunk) {
    temp = array.slice(i, i + chunk);
    console.log(temp)
}
