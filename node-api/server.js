const express = require("express");
const mysql = require("mysql2");

const app = express();

require("dotenv").config();

//test db
app.get("/", function (req, res, next) {
  const Conn = require("./db");

  Conn.execute("SELECT * FROM customer", function (err, results) {
    if (err) {
      res.json({ err: err });
    } else {
      res.json({ success: results });
    }
  });
});

// Start the server
app.listen(process.env.API_PORT, () => {
  console.log(`Server is running on port ${process.env.API_PORT}`);
});
