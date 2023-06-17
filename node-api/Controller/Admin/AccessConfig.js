const Conn = require("../../db");

const UpdateAccessConfig = (req, res, next) => {
  const { id } = req.params;
  let element = [];

  Object.entries(req.body).forEach(([key, value]) => {
    element.push(`${key} = ${value}`);
  });

  Conn.execute(
    `UPDATE role SET ${element} WHERE id = ${id}`,
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
  UpdateAccessConfig,
};
