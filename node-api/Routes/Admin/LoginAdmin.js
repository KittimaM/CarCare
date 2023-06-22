var express = require("express");
var router = express.Router();
const { LoginAdmin } = require("../../Controller/Admin/LoginAdmin");

router.post("/", LoginAdmin);

module.exports = router;
