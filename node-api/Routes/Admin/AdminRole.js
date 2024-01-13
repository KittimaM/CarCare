var express = require("express");
const {
  AdminGetAllRole,
  AdminAddRole,
} = require("../../Controller/Admin/AdminRole");

var router = express.Router();

router.get("/all", AdminGetAllRole);
router.post("/", AdminAddRole);

module.exports = router;
