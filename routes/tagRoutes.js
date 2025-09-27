const express = require("express");
const router = express.Router();
const {
  createNewTag,
  deleteExistingTag,
  getAllTags,
} = require("../controllers/tagsController");

router.post("/", createNewTag);
router.get("/", getAllTags);
router.delete("/:id", deleteExistingTag);

module.exports = router;
