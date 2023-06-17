var express = require("express");
var router = express.Router();
const { GetRole, DeleteRole, AddRole, UpdateRole } = require("../../Controller/Admin/Role");

// GET /role
router.get("/", GetRole);

// DELETE /role/:id
router.delete("/:id", DeleteRole);

// POST /role
router.post("/", AddRole);

router.put("/:id", UpdateRole);

module.exports = router;
