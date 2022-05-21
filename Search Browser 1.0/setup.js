import mysql from 'mysql'
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "DB_1.0",
  multipleStatements: true
});
con.connect();
function sql(command) {
      con.query(command, function (err, result) {
          if (err) throw err;
      });
}
sql("CREATE TABLE IF NOT EXISTS Links(URLs TINYTEXT NOT NULL);");
sql('INSERT INTO Links (URLs) VALUES ("https://de.wikipedia.org/wiki/Wikipedia:Hauptseite");');
sql("CREATE TABLE IF NOT EXISTS URLID(URL TINYTEXT NOT NULL, UID INT NOT NULL AUTO_INCREMENT,special INT, PRIMARY KEY (UID) );");
sql("CREATE TABLE IF NOT EXISTS WordID(word TINYTEXT NOT NULL, WID INT NOT NULL AUTO_INCREMENT, dateCreated DATETIME DEFAULT CURRENT_TIMESTAMP ,PRIMARY KEY (WID) );");
sql("CREATE TABLE IF NOT EXISTS wordList(WID INT NOT NULL, UID INT NOT NULL, value INT NOT NULL, FOREIGN KEY (WID) REFERENCES WordID(WID),  FOREIGN KEY (UID) REFERENCES URLID(UID) );");

con.end();
console.log("Finished");
