const Conn = require("../../db");

const GetRole = (req, res, next) => {
  Conn.execute(`SELECT * FROM role`, function (error, results) {
    if (error) {
      res.json({ msg: "ERROR", error });
    } else {
      res.json({ msg: "SUCCESS", results });
    }
  });
};

const DeleteRole = (req, res, next) => {
  const { id } = req.params;
  Conn.execute(
    `DELETE FROM role WHERE id = ? `,
    [id],
    function (error, results) {
      if (error) {
        res.json({ msg: "ERROR", error });
      } else {
        res.json({ msg: "SUCCESS" });
      }
    }
  );
};

const AddRole = (req, res, next) => {
  const { name, salary_perH } = req.body;
  Conn.execute(
    `INSERT INTO role(name, salary_perH) VALUES (?, ?)`,
    [name, salary_perH],
    function (error, results) {
      if (error) {
        res.json({ msg: "ERROR", error });
      } else {
        res.json({ msg: "SUCCESS" });
      }
    }
  );
};

const UpdateRole = (req, res, next) => {
  const { id } = req.params;
  const { name, salary_perH } = req.body;
  Conn.execute(
    `UPDATE role SET name = ?, salary_perH = ? WHERE id = ?`,
    [name, salary_perH, id],
    function (error, results) {
      if (error) {
        res.json({ msg: "ERROR", error });
      } else {
        res.json({ msg: "SUCCESS" });
      }
    }
  );
};

module.exports = {
  GetRole,
  DeleteRole,
  AddRole,
  UpdateRole,
};
