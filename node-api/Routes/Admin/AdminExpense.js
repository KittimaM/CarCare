var express = require("express");
const {
  AdminExpense,
  AdminAddExpense,
} = require("../../Controller/Admin/AdminExpense");
var router = express.Router();

router.get("/", AdminExpense);
router.post("/", AdminAddExpense);

module.exports = router;
