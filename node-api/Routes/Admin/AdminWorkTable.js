var express = require("express");
const {
  AdminAddWorkTable,
  AdminWorkTable,
  AdminUpdateWorkTable,
} = require("../../Controller/Admin/AdminWorkTable");
var router = express.Router();

router.get("/", AdminWorkTable);
router.post("/add", AdminAddWorkTable);
router.post("/update", AdminUpdateWorkTable);

module.exports = router;
