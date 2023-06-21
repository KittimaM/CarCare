var express = require("express");
var router = express.Router();
const { Login } = require("../../Controller/Customer/Login")

router.post("/", Login);

module.exports = router;
