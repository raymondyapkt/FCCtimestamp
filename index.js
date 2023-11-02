// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
require('dotenv').config()

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// ##############
app.get('/api', function(req, res) {
  let stD = new Date().toUTCString()
  let unixD = new Date().getTime()
  res.send({unix:unixD,utc:stD})
});


app.get("/api/:date", function (req, res) {
  var { date } = req.params
  function sendRes(dat){ 
    var unixD = new Date(dat).getTime()
    var stD = new Date(dat).toUTCString()
    if (stD == "Invalid Date"){res.json({error : "Invalid Date"})}
    res.send({ unix:unixD , utc:stD })       }
    function isNumeric(str) {
      const pattern = /^-?\d+(\.\d+)?$/; 
      return pattern.test(str);
    }

  if ( isNumeric(date) ){ sendRes(parseInt(date)) }else{ sendRes(date)        }    
});

// ##############



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
