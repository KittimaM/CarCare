var bcrypt = require("bcrypt");
const Conn = require("../../db");
const saltRounds = 10;

const AdminUser = (req, res, next) => {
  Conn.execute("SELECT * FROM staff_user", function (error, results) {
    if (error) {
      res.json({ status: "ERROR", msg: error });
    }
    if (results.length == 0) {
      res.json({ status: "NO DATA", msg: "NO DATA" });
    } else {
      res.json({ status: "SUCCESS", msg: results });
    }
  });
};

const AdminAddStaffUser = (req, res, next) => {
  const { username, name, password, role_id, role } = req.body;
  bcrypt.hash(password, saltRounds, function (error, hash) {
    if (error) {
      res.json({ status: "ERROR", msg: error });
    } else {
      Conn.execute(
        `INSERT INTO staff_user (username, name , password, role_id, role) VALUES (?,?,?,?,?)`,
        [username, name, hash, role_id, role],
        function (error, result) {
          if (error) {
            res.json({ status: "ERROR", msg: error });
          } else {
            const insertId = result.insertId;
            res.json({ status: "SUCCESS", msg: insertId });
          }
        }
      );
    }
  });
};

module.exports = {
  AdminUser,
  AdminAddStaffUser,
};
