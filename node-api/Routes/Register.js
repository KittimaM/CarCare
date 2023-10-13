var express = require("express");
var router = express.Router();
const { Register } = require("../Controller/Register");

router.post("/", Register);

module.exports = router;