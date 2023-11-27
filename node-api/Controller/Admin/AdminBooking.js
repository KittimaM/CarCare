const Conn = require("../../db");

const AdminBooking = (req, res, next) => {
  Conn.execute("SELECT * FROM booking", function (error, results) {
    if (error) {
      res.json({ status: "ERROR", error });
    }
    if (results.length == 0) {
      res.json({ status: "NOT FOUND" });
    } else {
      res.json({ status: "SUCCESS", results });
    }
  });
};

module.exports = {
  AdminBooking,
};
