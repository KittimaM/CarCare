var express = require("express");
var router = express.Router();

const { UpdateAccessConfig } = require("../../Controller/Admin/AccessConfig");

// PUT /accessconfig/:id
router.put("/:id", UpdateAccessConfig);

module.exports = router;
