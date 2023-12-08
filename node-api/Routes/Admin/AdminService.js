var express = require("express");
const {
  AdminService,
  AdminAddService,
} = require("../../Controller/Admin/AdminService");
var router = express.Router();

router.get("/", AdminService);
router.post("/", AdminAddService);

module.exports = router;
