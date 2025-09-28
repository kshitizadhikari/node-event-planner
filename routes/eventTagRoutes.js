const express = require("express");
const router = express.Router();
const {
  assignTagsToAnEvent,
  removeTags,
} = require("../controllers/eventTagsController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, assignTagsToAnEvent);
router.delete("/", protect, removeTags);

module.exports = router;
