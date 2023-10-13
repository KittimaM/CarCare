var bcrypt = require("bcrypt");
const saltRounds = 10;
const Conn = require("../../db");

const GetStaff = (req, res, next) => {
  Conn.execute(`SELECT * FROM staff`, function (error, results) {
    if (error) {
      res.json({ msg: "ERROR", error });
    } else {
      res.json({ msg: "SUCCESS", results: results, token: token });
    }
  });
};

const DeleteStaff = (req, res, next) => {
  const { id } = req.params;
  Conn.execute(`DELETE FROM staff WHERE id = ${id}`, function (error, results) {
    if (error) {
      res.json({ msg: "ERROR", error });
    } else {
      res.json({ msg: "SUCCESS" });
    }
  });
};

const AddStaff = (req, res, next) => {
  const {
    phone,
    firstName,
    lastName,
    id_number,
    role_id,
    password,
    branch_id,
  } = req.body;
  bcrypt.hash(password, saltRounds, function (error, hash) {
    if (error) {
      res.json({ msg: "ERROR", error });
    } else {
      Conn.execute(
        `INSERT INTO staff(phone,firstName,lastName,id_number,role_id,password,branch_id) VALUES (?,?,?,?,?,?,?)`,
        [phone, firstName, lastName, id_number, role_id, hash, branch_id],
        function (error, results) {
          if (error) {
            res.json({ msg: "ERROR", error });
          } else {
            res.json({ msg: "SUCCESS" });
          }
        }
      );
    }
  });
};

const UpdateStaff = (req, res, next) => {
  const { id } = req.params;
  const {
    phone,
    firstName,
    lastName,
    id_number,
    password,
    role_id,
    branch_id,
  } = req.body;
  bcrypt.hash(password, saltRounds, function (error, hash) {
    if (error) {
      res.json({ msg: "ERROR", error });
    } else {
      Conn.execute(
        `UPDATE staff SET phone = ? , firstName = ? , lastName = ? , id_number = ? , password = ? ,role_id = ? , branch_id = ? WHERE id = ?`,
        [phone, firstName, lastName, id_number, hash, role_id, branch_id, id],
        function (error, results) {
          if (error) {
            res.json({ msg: "ERROR", error });
          } else {
            res.json({ msg: "SUCCESS" });
          }
        }
      );
    }
  });
};

module.exports = {
  GetStaff,
  DeleteStaff,
  AddStaff,
  UpdateStaff,
};
