var bcrypt = require("bcrypt");
const Conn = require("../../db");
const saltRounds = 10;

const CustomerRegister = (req, res, next) => {
  const { phone, name, password } = req.body;
  bcrypt.hash(password, saltRounds, function (error, hash) {
    if (error) {
      res.json({ status: "ERROR", msg: "in hash" });
    } else {
      Conn.execute(
        `INSERT INTO customer (phone, name , password, created_at) VALUES (?,?,?, NOW())`,
        [phone, name, hash],
        function (error, result) {
          if (error) {
            res.json({ status: "ERROR", msg, error });
          } else {
            res.json({ status: "SUCCESS" });
          }
        }
      );
    }
  });
};

module.exports = {
  CustomerRegister,
};
