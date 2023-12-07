const Conn = require("../../db");

const AdminService = (req, res, next) => {
  Conn.execute("SELECT * FROM service", function (error, results) {
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

module.exports = {
  AdminService,
};
