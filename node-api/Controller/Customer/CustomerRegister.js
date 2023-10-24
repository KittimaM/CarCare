var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const Conn = require("../../db");
const saltRounds = 10;
const secret = process.env.SECRET_WORD;

const CustomerRegister = (req, res, next) => {
  const { username, name, password } = req.body;
  bcrypt.hash(password, saltRounds, function (error, hash) {
    if (error) {
      res.json({ status: "ERROR", msg: error });
    } else {
      Conn.execute(
        `INSERT INTO customer_user (username, name , password) VALUES (?,?,?)`,
        [username, name, hash],
        function (error, result) {
          if (error) {
            res.json({ status: "ERROR", msg, error });
          }
          res.json({ status: "SUCCESS" });
        }
      );
    }
  });
};

module.exports = {
  CustomerRegister,
};
