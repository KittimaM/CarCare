var express = require("express");
const {
  AdminBooking,
  AdminAddBooking,
} = require("../../Controller/Admin/AdminBooking");
var router = express.Router();

router.get("/", AdminBooking);
router.post("/", AdminAddBooking);

module.exports = router;