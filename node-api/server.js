var express = require('express')
var cors = require('cors')
var app = express()

app.use(cors())


// get the client
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password:'carcare',
  database: 'carcare',
  port:'3307'
});


app.get('/products/:id', function (req, res, next) {

  connection.query(
    'SELECT * FROM customer',
    function(err, results, fields) {
      res.json(results)
    }
  );

  // res.json({msg: 'This is CORS-enabled for all origins!'})
})

app.listen(5000, function () {
  console.log('CORS-enabled web server listening on port 5000')
})