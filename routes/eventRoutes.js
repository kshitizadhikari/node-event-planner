const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();
const {
  createNewEvent,
  getSingleEvent,
  updateExistingEvent,
  deleteExistingEvent,
  getMyEvents,
  getEventsFiltered,
} = require("../controllers/eventsController");

router.get("/user-events", protect, getMyEvents);
router.get("/", getEventsFiltered);
router.get("/:id", getSingleEvent);
router.post("/", protect, createNewEvent);
router.put("/:id", protect, updateExistingEvent);
router.delete("/:id", protect, deleteExistingEvent);

module.exports = router;
