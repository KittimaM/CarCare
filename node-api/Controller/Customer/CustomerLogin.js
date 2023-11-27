var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const Conn = require("../../db");
const secret = process.env.SECRET_WORD;

const CustomerLogin = (req, res, next) => {
  const { phone, password } = req.body;
  Conn.execute(
    "SELECT id, password FROM customer_user WHERE phone = ?",
    [phone],
    function (error, result) {
      if (error) {
        res.json({ status: "ERROR", error });
      }
      if (result.length == 0) {
        res.json({ status: "NOT FOUND" });
      } else {
        const customerId = result[0].id;
        const customerPassword = result[0].password;
        bcrypt.compare(password, customerPassword, function (error, result) {
          if (error) {
            res.json({ status: "ERROR", msg: error });
          } else {
            if (result) {
              const token = jwt.sign({ id: customerId }, secret, {
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
