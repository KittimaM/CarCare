var express = require("express");
const { AdminRegister } = require("../../Controller/Admin/AdminRegister");
var router = express.Router();

router.post("/", AdminRegister);

module.exports = router;