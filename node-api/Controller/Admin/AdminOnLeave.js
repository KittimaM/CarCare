var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const Conn = require("../../db");
const secret = process.env.SECRET_WORD;

const AdminGetAllOnLeave = (req, res, next) => {
  Conn.execute("SELECT * FROM on_leave", function (error, results) {
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

const AdminAddOnLeave = (req, res, next) => {
  const { staff_id, date, reason } = req.body;
  Conn.execute(
    "INSERT INTO on_leave(staff_id, date, reason) VALUES (?,?,?)",
    [staff_id, date, reason],
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

const AdminDeleteOnLeave = (req, res, next) => {
  const { id } = req.body;
  Conn.execute(
    "DELETE FROM on_leave WHERE id = ?",
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

const AdminUpdateOnLeave = (req, res, next) => {
  const { id, staff_id, date, reason } = req.body;
  Conn.execute(
    "UPDATE on_leave SET staff_id = ?, date = ?, reason = ? WHERE id = ?",
    [staff_id, date, reason, id],
    function (error, result) {
      if (error) {
        res.json({ status: "ERROR", msg: error });
      } else {
        res.json({ status: "SUCCESS", msg: "SUCCESS" });
      }
    }
  );
};

const AdminApproveOnLeave = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, secret);
    const { id } = req.body;
    Conn.execute(
      "UPDATE on_leave SET is_approved = 1, approved_by_id = ? WHERE id = ?",
      [decoded.id, id],
      function (error, result) {
        if (error) {
          res.json({ status: "ERROR", msg: error });
        } else {
          res.json({ status: "SUCCESS", msg: "SUCCESS" });
        }
      }
    );
  } catch (err) {
    res.json({ status: "ERROR", msg: "token expired" });
  }
};

const AdminGetOnLeavePersonal = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, secret);
    const staff_id = decoded.id;
    Conn.execute(
      "SELECT * FROM on_leave WHERE staff_id = ?",
      [staff_id],
      function (error, results) {
        if (error) {
          res.json({ status: "ERROR", msg: error });
        }
        if (results.length == 0) {
          res.json({ status: "NO DATA", msg: "NO DATA" });
        } else {
          res.json({ status: "SUCCESS", msg: results });
        }
      }
    );
  } catch (err) {
    res.json({ status: "ERROR", msg: "token expired" });
  }
};

const AdminAddOnLeavePersonal = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, secret);
    const staff_id = decoded.id;
    const { date, reason } = req.body;
    Conn.execute(
      "INSERT INTO on_leave(staff_id, date, reason) VALUES (?,?,?)",
      [staff_id, date, reason],
      function (error, result) {
        if (error) {
          res.json({ status: "ERROR", msg: error });
        } else {
          const insertId = result.insertId;
          res.json({ status: "SUCCESS", msg: insertId });
        }
      }
    );
  } catch (err) {
    res.json({ status: "ERROR", msg: "token expired" });
  }
};

module.exports = {
  AdminGetAllOnLeave,
  AdminAddOnLeave,
  AdminDeleteOnLeave,
  AdminUpdateOnLeave,
  AdminApproveOnLeave,
  AdminGetOnLeavePersonal,
  AdminAddOnLeavePersonal,
};
