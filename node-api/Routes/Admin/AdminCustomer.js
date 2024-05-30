var express = require("express");
const {
  AdminGetAllCustomer,
  AdminAddCustomer,
  AdminUpdateCustomer,
  AdminDeleteCustomer,
} = require("../../Controller/Admin/AdminCustomer");
var router = express.Router();

router.get("/", AdminGetAllCustomer);
router.post("/", AdminAddCustomer);
router.put("/", AdminUpdateCustomer);
router.delete("/", AdminDeleteCustomer);

module.exports = router;
