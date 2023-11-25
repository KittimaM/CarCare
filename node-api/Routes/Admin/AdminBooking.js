var express = require("express");
const { AdminBooking } = require("../../Controller/Admin/AdminBooking");
var router = express.Router();

router.get("/", AdminBooking);

module.exports = router;