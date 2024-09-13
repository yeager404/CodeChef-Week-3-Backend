const express = require("express");
const router = express.Router();

const { createHTML } = require("../controller/getHTML.controller.js");

router.get("/", createHTML);

module.exports = router;