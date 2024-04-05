var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const Conn = require("../../db");
const secret = process.env.SECRET_WORD;

const CustomerLogin = (req, res, next) => {
  const { phone, password } = req.body;
  Conn.execute(
    "SELECT id, password, name FROM customer WHERE phone = ?",
    [phone],
    function (error, result) {
      if (error) {
        res.json({ status: "ERROR", error });
      }
      if (result.length == 0) {
        res.json({ status: "NOT FOUND" });
      } else {
        const customerPassword = result[0].password;
        const customerName = result[0].name;
        const customerId = result[0].id;
        bcrypt.compare(password, customerPassword, function (error, result) {
          if (error) {
            res.json({ status: "ERROR", msg: error });
          } else {
            if (result) {
              const token = jwt.sign(
                { id: customerId, phone: phone, name: customerName },
                secret,
                {
                  expiresIn: "8h",
                }
              );
              res.json({ status: "SUCCESS", msg: token });
            } else {
              res.json({ status: "ERROR", msg: "Wrong Password" });
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
