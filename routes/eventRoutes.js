const express = require("express");
const router = express.Router();
const {
  createNewEvent,
  getAllEvents,
  getSingleEvent,
  updateExistingEvent,
  deleteExistingEvent,
} = require("../controllers/eventsController");

const { protect } = require("../middleware/authMiddleware");

// Public routes
router.get("/", getAllEvents);
router.get("/:id", getSingleEvent);

// Protected routes (require authentication)
router.post("/", protect, createNewEvent);
router.put("/:id", protect, updateExistingEvent);
router.delete("/:id", protect, deleteExistingEvent);

module.exports = router;
