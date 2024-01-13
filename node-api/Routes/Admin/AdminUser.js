var express = require("express");
const { AdminUser, AdminAddStaffUser } = require("../../Controller/Admin/AdminUser");
var router = express.Router();

router.get("/", AdminUser);
router.post("/add", AdminAddStaffUser)

module.exports = router;