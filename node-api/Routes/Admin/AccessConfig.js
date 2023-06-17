var express = require("express");
const { UpdateAccessConfig } = require("../../Controller/Admin/AccessConfig");
var router = express.Router();

// PUT /accessconfig/:id
router.put("/:id", UpdateAccessConfig);

module.exports = router;
