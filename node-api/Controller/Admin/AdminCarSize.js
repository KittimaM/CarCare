const Conn = require("../../db");

const AdminCarSize = (req, res, next) => {
  Conn.execute("SELECT * FROM car_size", function (error, results) {
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

const AdminAddCarSize = (req, res, next) => {
  const { size, description } = req.body;
  Conn.execute(
    `INSERT INTO car_size(size, description) VALUES(?, ?)`,
    [size, description],
    function (error, result) {
      if (error) {
        res.json({ status: "ERROR", msg: error });
      } else {
        res.json({ status: "SUCCESS"});
      }
    }
  );
};

module.exports = {
  AdminCarSize,
  AdminAddCarSize,
};
