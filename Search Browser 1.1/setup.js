import mysql from 'mysql'


////////////////////////////////////////
//               SQL SERVER
////////////////////////////////////////
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "DB_1.0",
    multipleStatements: true
});
con.connect();
function sql(command) {
      con.query(command, function (err, result) {
          if (err) throw err;
      });
}


////////////////////////////////////////
//               SQL COMMANDS
////////////////////////////////////////
sql("CREATE TABLE IF NOT EXISTS links(URL TINYTEXT NOT NULL);");
sql("CREATE TABLE IF NOT EXISTS URLID(URL TINYTEXT NOT NULL, UID INT NOT NULL AUTO_INCREMENT, special INT DEFAULT 0, dateCreated DATETIME DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (UID) );");
sql("CREATE TABLE IF NOT EXISTS wordID(word TINYTEXT NOT NULL, WID INT NOT NULL AUTO_INCREMENT ,PRIMARY KEY (WID) );");
sql("CREATE TABLE IF NOT EXISTS wordList(WID INT NOT NULL, UID INT NOT NULL, value INT NOT NULL, FOREIGN KEY (WID) REFERENCES wordID(WID),  FOREIGN KEY (UID) REFERENCES URLID(UID) );");

sql("DELETE FROM links");
sql("DELETE FROM wordList");
sql("DELETE FROM wordID");
sql("DELETE FROM URLID");

sql('INSERT INTO links (URL) VALUES ("https://de.wikipedia.org/wiki/Internet")');

con.end();
console.log("Finished");
