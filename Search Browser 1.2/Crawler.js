import fetch from 'node-fetch';
import cheerio from 'cheerio';
import mysql from 'mysql'
var mom, wordlist;


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


        // GET DATA WITH URL AND SAVE ALL LINKS
        MgetRawData(res[0].URL).then((gData) => {
            var urlArray = []
            const $ = cheerio.load(gData);
            $($('a')).each(function(i, link){
                mom = $(link).attr("href") || "";
                if (mom.startsWith("https://de.wiki")){
                    urlArray.push(mom);
                }
                if (mom.startsWith("/")){
                    urlArray.push("https://de.wikipedia.org"+mom);
                }
            });
            con.query(`INSERT IGNORE INTO links (URL) VALUES (?) `, urlArray);

            
            // sql("DELETE URL FROM links WHERE URL IN (SELECT URL FROM URLID);");



            ////////////////////////////////////////
            //            COUNT ALL WORDS
            ////////////////////////////////////////
            var wordList = wordFreq($('title').text(), 20, {});
                wordList = wordFreq($('h1, h2, h3, h4, h5, h6').text(), 10, wordList);
                wordList = wordFreq(gData.replace(/( |<([^>]+)>)/ig, ' ').replace(/\s\s+/g, ' '), 1, wordList);
                wordList = Object.entries(wordList)
                .filter(([key, value]) => value > 3 && key.length < 30 && key !== ("" || " "))
                .reduce((res, [key]) => (res[key] = wordList[key], res), {});


            ////////////////////////////////////////
            //            UPLOAD ALL WORDS
            ////////////////////////////////////////
            // for (const [key, value] of Object.entries(wordList)) {
            //     con.query(`INSERT INTO wordID(word) SELECT ? WHERE ? NOT IN (SELECT word FROM wordID)`,[key, key]);
            //     con.query(`INSERT INTO wordList(WID, UID, value) VALUES((SELECT WID FROM wordID WHERE word = ? LIMIT 1),
            //         (SELECT UID FROM URLID WHERE URL = ? LIMIT 1), ?)`,
            //         [key, res[0].URL, value]);
            // }




            var mkeys = Object.keys(wordList) || " ";
            var mvalues = Object.values(wordList) || 1;

            var i, j, tkeys, command, tvalues, chunk = 900;
            for (i = 0,j = mkeys.length; i < j; i += chunk) {
                tkeys = mkeys.slice(i, i + chunk);
                tvalues = mvalues.slice(i, i + chunk);
                command = "INSERT IGNORE INTO wordID(word) VALUES "
                for(let i = 0; i < tkeys.length; i++){
                    command += '(?), '
                }
                command = command.substring(0, command.length - 2);
                con.query(command, mkeys);
                con.query(`INSERT IGNORE INTO wordList(WID, UID, value) VALUES((SELECT WID FROM wordID WHERE word IN (?)),
                          (SELECT UID FROM URLID WHERE URL = ?), ?)`,
                           [tkeys, res[0].URL, tvalues]);
            }

            con.query("INSERT INTO URLID (URL)",[res[0].URL]);
            con.query("DELETE FROM links LIMIT 1");
            console.log("Der erste ablauf ist Fertig.");
        });
})}

//Start the Crawler
crawl();
