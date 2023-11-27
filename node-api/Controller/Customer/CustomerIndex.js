var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const Conn = require("../../db");
const secret = process.env.SECRET_WORD;

const CustomerIndex = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const { id } = jwt.verify(token, secret);
    Conn.execute("SELECT * FROM booking WHERE customer_user_id = ?",[id], function (error, results) {
      if (error) {
        res.json({ status: "ERROR", msg: error });
      }
      if (results.length == 0) {
        res.json({ status: "NOT FOUND" });
      } else {
        res.json({ status: "SUCCESS", results });
      }
    });
  } catch (error) {
    res.json({ status: "ERROR", msg: "token expired" });
  }
};

module.exports = {
  CustomerIndex,
};
