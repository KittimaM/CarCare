var bcrypt = require("bcrypt");
const Conn = require("../../db");
const saltRounds = 10;

const AdminRegister = (req, res, next) => {
  const { username, name, password } = req.body;
  bcrypt.hash(password, saltRounds, function (error, hash) {
    if (error) {
      res.json({ status: "ERROR", msg: "in hash" });
    } else {
      Conn.execute(
        `INSERT INTO staff_user (username, name , password) VALUES (?,?,?)`,
        [username, name, hash],
        function (error, result) {
          if (error) {
            res.json({ status: "ERROR", msg: error });
          }
          res.json({ status: "SUCCESS" });
        }
      );
    }
  });
};

module.exports = {
  AdminRegister,
};
