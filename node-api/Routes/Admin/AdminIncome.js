var express = require("express");
const {
  AdminIncome,
  AdminAddIncome,
} = require("../../Controller/Admin/AdminIncome");
var router = express.Router();

router.get("/", AdminIncome);
router.post("/", AdminAddIncome);

module.exports = router;
