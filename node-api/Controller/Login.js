var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const Conn = require("../db");
const secret = process.env.SECRET_WORD;

const Login = (req, res, next) => {
  const { username, password } = req.body;
  Conn.execute(
    "SELECT * FROM user WHERE username = ? AND password = ?", [username, password],
    function (error, results) {
      if (error) {
        res.json({ msg: "ERROR", error });
      } 
      res.json({msg : "SUCCESS"});
    }
  );
};

module.exports = {
  Login
};
