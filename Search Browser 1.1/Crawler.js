import fetch from 'node-fetch';
import cheerio from 'cheerio';
import mysql from 'mysql'

var mom;

////////////////////////////////////////
//               REQUEST FUNCTION
////////////////////////////////////////
async function MgetRawData(URL) {
    return await fetch(URL).then((response) => response.text());
}
// MgetRawData(URL).then(console.log);



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



////////////////////////////////////////
//               WORDLIST ALGORYTHM
////////////////////////////////////////
function wordFreq(string, mult,freqMap) {
    var words = string.replace(/[^\w\d ]/g, '').toLowerCase().split(" ");

    words.forEach(function(w) {
        if (!freqMap[w]) {
            freqMap[w] = 0;
        }
        freqMap[w] += mult;
    });
    return freqMap;
}



////////////////////////////////////////////////////////////////////////////////
//                                  MAIN PART
////////////////////////////////////////////////////////////////////////////////
function crawl() {

    // GET FIRST LINK
    con.query("SELECT URL FROM links LIMIT 1; ", (err,res) => {
        con.query("INSERT INTO URLID (URL) VALUES( ? )",[res[0].URL]);

        // GET DATA WITH URL AND SAVE ALL LINKS
        MgetRawData(res[0].URL).then((gData) => {
            const $ = cheerio.load(gData);
            $($('a')).each(function(i, link){
                mom = $(link).attr("href") || "";
                if (mom.startsWith("https")){
                    con.query(`INSERT INTO links (URL) SELECT ? WHERE ? NOT IN (SELECT URL FROM URLID)`, [mom, mom]);
                }
            });
            // sql("DELETE URL FROM links WHERE URL IN (SELECT URL FROM URLID);");



            ////////////////////////////////////////
            //            COUNT ALL WORDS
            ////////////////////////////////////////
            var wordList = wordFreq($('title').text(), 20, {});
                wordList = wordFreq($('h1, h2, h3, h4, h5, h6').text(), 10, wordList);
                wordList = wordFreq($('*').text(), 1, wordList);
                wordList = Object.entries(wordList)
                .filter(([key, value]) => value > 3 && key.length < 30)
                .reduce((res, [key]) => (res[key] = wordList[key], res), {});


            ////////////////////////////////////////
            //            UPLOAD ALL WORDS
            ////////////////////////////////////////
            for (const [key, value] of Object.entries(wordList)) {
                con.query(`INSERT INTO wordID(word) SELECT ? WHERE ? NOT IN (SELECT word FROM wordID)`,[key, key]);
                con.query(`INSERT INTO wordList(WID, UID, value) VALUES((SELECT WID FROM wordID WHERE word = ? LIMIT 1),
                    (SELECT UID FROM URLID WHERE URL = ? LIMIT 1), ?)`,
                    [key, res[0].URL, value]);
            }
            console.log("Der erste ablauf ist Fertig.");
        });
})}

//Start the Crawler
crawl();
