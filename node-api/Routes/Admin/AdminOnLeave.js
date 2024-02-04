var express = require("express");
const {
  AdminGetAllOnLeave,
  AdminAddOnLeave,
  AdminDeleteOnLeave,
  AdminUpdateOnLeave,
  AdminApproveOnLeave,
} = require("../../Controller/Admin/AdminOnLeave");

var router = express.Router();

router.get("/", AdminGetAllOnLeave);
router.post("/", AdminAddOnLeave);
router.delete("/", AdminDeleteOnLeave);
router.put("/", AdminUpdateOnLeave);
router.put("/approve", AdminApproveOnLeave);

module.exports = router;
