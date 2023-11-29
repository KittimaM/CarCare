var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const Conn = require("../../db");
const secret = process.env.SECRET_WORD;

const AdminLogin = (req, res, next) => {
  const { username, password } = req.body;
  Conn.execute(
    `SELECT id, password FROM staff_user WHERE username = ? LIMIT 1`,
    [username],
    function (error, result) {
      if (error) {
        res.json({ status: "ERROR", msg: error });
      } else if (result.length == 0) {
        res.json({ status: "NOT FOUND" });
      } else {
        const staffPassword = result[0].password;
        const staffId = result[0].id;
        bcrypt.compare(password, staffPassword, function (error, result) {
          if (error) {
            res.json({ status: "ERROR", msg: error });
          } else {
            if (result) {
              const token = jwt.sign(
                { id: staffId, username: username },
                secret,
                { expiresIn: "10h" }
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
  AdminLogin,
};
