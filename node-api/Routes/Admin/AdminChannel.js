var express = require("express");
const { AdminGetChannel } = require("../../Controller/Admin/AdminChannel");
var router = express.Router();

router.get("/", AdminGetChannel);

module.exports = router;
