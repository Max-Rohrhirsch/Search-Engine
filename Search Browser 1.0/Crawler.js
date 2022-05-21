import fetch from 'node-fetch';      //npm install node-fetch
import cheerio from 'cheerio';
import mysql from 'mysql'
const URL = 'https://communitywiki.org/wiki/SmolNet';

//----------------Request-----------------
async function MgetRawData(URL) {
    const gData = await fetch(URL).then((response) => response.text());
    const $ = cheerio.load(gData);
    // return $('a').attr('href')
    return ($('a').attr('href'));
}
// MgetRawData(URL).then(console.log);



//--------------SQL Connection-------------
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "DB_1.0",
  multipleStatements: true
});
con.connect();
function sql(command) {
      con.query(command, function (err, res) {
          if (err) throw err;


          MgetRawData(res[0].URL).then(wordFreq);
      });
}


//-------------wordlist algorythm----------
function wordFreq(string, mult=1) {
    var words = string.replace(/[.]/g, '').toLowerCase().split(/\s/);
    var freqMap = {};
    words.forEach(function(w) {
        if (!freqMap[w]) {
            freqMap[w] = 0;
        }
        freqMap[w] += mult;
    });
    return freqMap;
}


//------------------command---------------n
sql("SELECT FIRST(URL) FROM Links;");
sql("DELETE FIRST(URL) FROM Links;");
    //get first Link
    //getDatas(Link);
    //Link ID if not exist
    //else new Link

    //Cheerio title
    //wodlist(cheerio data);

    //Cheerio header
    //wodlist(cheerio data);

    //Cheerio all?
    //wodlist(cheerio data);

    //send DB
    //reset all + loop
