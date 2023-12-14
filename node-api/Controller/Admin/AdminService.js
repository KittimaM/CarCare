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

const AdminAddService = (req, res, next) => {
  const { service } = req.body;
  Conn.execute(
    `INSERT INTO service(service) VALUES(?)`,
    [service],
    function (error, result) {
      if (error) {
        res.json({ status: "ERROR", msg: error });
      } else {
        res.json({ status: "SUCCESS" });
      }
    }
  );
};

module.exports = {
  AdminService,
  AdminAddService,
};
