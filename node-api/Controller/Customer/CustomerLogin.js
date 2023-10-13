var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const Conn = require("../../db");
const secret = process.env.SECRET_WORD;

const CustomerLogin = (req, res, next) => {
  const { username, password } = req.body;
  Conn.execute(
    "SELECT * FROM customer_user WHERE username = ? AND password = ? LIMIT 1", [username, password],
    function (error, results) {
      if (error) {
        res.json({ msg: "ERROR", error });
      } 
      if (results.length == 0) {
        res.json({msg: "NOT FOUND"})
      } else {
        res.json({msg : "SUCCESS", results});
      }
    }
  );
};

module.exports = {
  CustomerLogin
};
