var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const Conn = require("../../db");
const secret = process.env.SECRET_WORD;

const CustomerLogin = (req, res, next) => {
  const { phone, password } = req.body;
  Conn.execute(
    "SELECT password FROM customer_user WHERE phone = ?",
    [phone],
    function (error, result) {
      if (error) {
        res.json({ status: "ERROR", error });
      }
      if (result.length == 0) {
        res.json({ status: "NOT FOUND" });
      } else {
        bcrypt.compare(password, result[0].password, function (error, result) {
          if (error) {
            res.json({ status: "ERROR", msg: error });
          } else {
            if (result) {
              const token = jwt.sign({ phone: phone }, secret, {
                expiresIn: "1h",
              });
              res.json({ status: "SUCCESS", token });
            } else {
              res.json({ status: "ERROR", msg: "try again" });
            }
          }
        });
      }
    }
  );
};

module.exports = {
  CustomerLogin,
};
