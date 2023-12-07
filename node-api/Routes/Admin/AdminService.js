var express = require("express");
const { AdminService } = require("../../Controller/Admin/AdminService");
var router = express.Router();

router.get("/", AdminService);

module.exports = router;