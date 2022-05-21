    // for (const [key, value] of Object.entries(object)) {
    //     console.log(key, value);
    // }

// import mysql from 'mysql'
// var con = mysql.createConnection({
//       host: "localhost",
//       user: "root",
//       password: "",
//       database: "DB_1.0",
//       multipleStatements: true
// });
// con.connect();
// function sql(command, callback) {
//        con.query(command, function (err, res) {
//           if (err) throw err;
//
//           // console.log(res[0].URLs)
//           res[0].URLs
//           return callback(res[0].URLs);
//       });
// }
// sql(parm, function(res){
//
//
//    //rest of your code goes in here
// });
//
// con.end()


var params = ["hallo","du","da"]
var beb = params[0] + '"';
for (var i=1; i<params.length;i++) {
    beb += ' AND "' + params[i] + '"';
}
console.log(beb)
