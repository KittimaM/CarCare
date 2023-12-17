var express = require("express");
const {
  CustomerBooking,
  CustomerGetServiceChoice,
} = require("../../Controller/Customer/CustomerBooking");
var router = express.Router();

router.post("/", CustomerBooking);
router.post("/service", CustomerGetServiceChoice);

module.exports = router;
