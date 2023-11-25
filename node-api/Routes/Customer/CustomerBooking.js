var express = require("express");
const { CustomerBooking } = require("../../Controller/Customer/CustomerBooking");
var router = express.Router();

router.post("/", CustomerBooking);

module.exports = router;