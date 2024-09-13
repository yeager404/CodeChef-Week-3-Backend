const express = require("express");
const router = express.Router();

const { editHTML } = require("../controller/editHTML.controller.js");

router.get("/", editHTML);

module.exports = router;