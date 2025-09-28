const express = require("express");
const router = express.Router();
const {
  assignTagsToAnEvent,
  removeTags,
} = require("../controllers/eventTagsController");

router.post("/", assignTagsToAnEvent);
router.delete("/", removeTags);

module.exports = router;
