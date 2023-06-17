var express = require("express");
const {
  GetStaff,
  DeleteStaff,
  AddStaff,
  UpdateStaff,
} = require("../../Controller/Admin/Staff");
var router = express.Router();

// GET /staff
router.get("/", GetStaff);

// DELETE /staff/:id
router.delete("/:id", DeleteStaff);

// POST /staff
router.post("/", AddStaff);

// PUT /staff/:id
router.put("/:id", UpdateStaff);

module.exports = router;
