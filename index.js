// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

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
app.get("/api/:date?", function (req, res) {
  // Get paramter
  let item = req.params.date;


  // Check if parameter provided
  let date;
  if (!item) {
    // If not set date to current date
    date = new Date();
  } else {
    date = new Date(item);
    // Check if unix format
    if (date == 'Invalid Date') {
      date = new Date(parseInt(item));
    }
  }

  // Convert to UTC and UNIX
  const utc = date.toUTCString();
  const unix = date.getTime();

  // Error if wrond format
  if (date == "Invalid Date") {
    res.json({ error: "Invalid Date"})
  }

  // Return results
  res.json({unix: unix, utc: utc});
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
