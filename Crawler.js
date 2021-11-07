import fetch from 'node-fetch';      //npm install node-fetch
import cheerio from 'cheerio';
import mysql from 'mysql'

// const URL = 'https://communitywiki.org/wiki/SmolNet';




//----------------Request-----------------n
const getRawData = (url) => {
   return fetch(URL)
      .then((response) => response.text())
      .then((data) => {
          return data
      });
};

//--------------Raw Data-----------------n
const getData = async () => {
   const getDatas = await getRawData(URL);
   // console.log(getDatas); //for test
   const $ = cheerio.load(getDatas);
   console.log( $('a').attr('href')  );
};
getData();
// getData(LINK);


//--------------SQL Connection-------------//
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "testDB"
});

//-------------wordlist algorythm----------n
//------------------command---------------n
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to the Database!");
  con.query("CREATE DATABASE mydb", function (err, result) {
    if (err) throw err;
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






    console.log("finished");
  });
});
