const express = require("express");
const router = express.Router();
const { assignTagsToAnEvent } = require("../controllers/eventTagsController");

router.post("/", assignTagsToAnEvent);

module.exports = router;
