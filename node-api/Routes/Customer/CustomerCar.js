var express = require("express");
const {
  CustomerCar,
  CustomerAddCustomerCar,
} = require("../../Controller/Customer/CustomerCar");
var router = express.Router();

router.get("/", CustomerCar);
router.post("/", CustomerAddCustomerCar);

module.exports = router;
