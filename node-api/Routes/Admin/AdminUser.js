var express = require("express");
const { AdminUser } = require("../../Controller/Admin/AdminUser");
var router = express.Router();

router.get("/", AdminUser);

module.exports = router;