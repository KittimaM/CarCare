const Conn = require("../../db");

const AdminUser = (req, res, next) => {
  Conn.execute("SELECT * FROM staff_user", function (error, results) {
    if (error) {
      res.json({ status: "ERROR", msg: error });
    }
    if (results.length == 0) {
      res.json({ status: "NOT FOUND" });
    } else {
      res.json({ status: "SUCCESS", msg: results });
    }
  });
};

module.exports = {
  AdminUser,
};
