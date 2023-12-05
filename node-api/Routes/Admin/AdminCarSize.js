var express = require("express");
const { AdminCarSize, AdminAddCarSize } = require("../../Controller/Admin/AdminCarSize");
var router = express.Router();

router.get("/", AdminCarSize);
router.post("/", AdminAddCarSize);

module.exports = router;