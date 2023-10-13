const Conn = require("../../db");

const GetRole = (req, res, next) => {
  const { role_id } = req.decoded.data;
  Conn.execute(
    `SELECT get_role FROM role WHERE id = ${role_id}`,
    function (error, result) {
      if (error) {
        res.json({ msg: "ERROR", error });
      } else {
        if (result[0].get_role == 1) {
          Conn.execute(`SELECT * FROM role`, function (error, results) {
            if (error) {
              res.json({ msg: "ERROR", error });
            } else {
              res.json({ msg: "SUCCESS", results });
            }
          });
        } else {
          res.json({msg:"No Permission"});
        }
      }
    }
  );
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
