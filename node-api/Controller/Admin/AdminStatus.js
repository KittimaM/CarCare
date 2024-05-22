const Conn = require("../../db");

const AdminGetAllStatus = (req, res, next) => {
  Conn.execute("SELECT * FROM status", function (error, results) {
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

const AdminAddStatus = (req, res, next) => {
  const { code, description } = req.body;
  Conn.execute(
    "INSERT INTO status (code, description) VALUES (?,?)",
    [code, description],
    function (error, result) {
      if (error) {
        res.json({ status: "ERROR", msg: error });
      } else {
        const insertId = result.insertId;
        res.json({ status: "SUCCESS", msg: insertId });
      }
    }
  );
};

const AdminDeleteStatus = (req, res, next) => {
  const { id } = req.body;
  Conn.execute(
    "DELETE FROM status WHERE id = ?",
    [id],
    function (error, result) {
      if (error) {
        res.json({ status: "ERROR", msg: error });
      } else {
        res.json({ status: "SUCCESS", msg: "SUCCESS" });
      }
    }
  );
};

const AdminUpdateStatus = (req, res, next) => {
  const { id, code, description } = req.body;
  Conn.execute(
    "UPDATE status SET code = ?, description = ? WHERE id = ?",
    [code, description, id],
    function (error, result) {
      if (error) {
        res.json({ status: "ERROR", msg: error });
      } else {
        res.json({ status: "SUCCESS", msg: "SUCCESS" });
      }
    }
  );
};
module.exports = {
  AdminGetAllStatus,
  AdminAddStatus,
  AdminDeleteStatus,
  AdminUpdateStatus,
};
