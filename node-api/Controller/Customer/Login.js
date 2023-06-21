var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const Conn = require("../../db");
const secret = process.env.SECRET_WORD;

const Login = (req, res, next) => {
  const { user, password } = req.body;
  Conn.execute(
    `SELECT * FROM customer WHERE phone = ${user}`,
    function (error, results) {
      if (error) {
        res.json({ msg: "ERROR", error });
      } else if (results.length != 0){
        bcrypt.compare(
          password,
          results[0].password,
          function (compareError, compareResults) {
            if (compareError) {
              res.json({ msg: "ERROR", compareError });
            } else {
              if (compareResults) {
                const token = jwt.sign({ customer: results[0] }, secret, {
                  expiresIn: "10h",
                });
                res.json({msg: "SUCCESS",token})
              } else {
                res.json({ msg: "ERROR" });
              }
            }
          }
        );
      } else {
        res.json({msg: "ERROR"});
      }
    }
  );
};

module.exports = {
  Login
};
