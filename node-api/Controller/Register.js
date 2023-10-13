var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const Conn = require("../db");
const secret = process.env.SECRET_WORD;

const Register = (req, res, next) => {
  const { username, name, password } = req.body;
  Conn.execute(
    `INSERT INTO user (username, name , password) VALUES (?,?,?)`,[username, name, password],
    function (error, results) {
      if (error) {
        res.json({ msg: "ERROR", error });
      } 
      res.json({msg: "SUCCESS"});
    }
  );
};

module.exports = {
  Register
};
