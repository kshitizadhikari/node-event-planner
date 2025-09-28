const express = require("express");
const router = express.Router();
const {
  createNewEvent,
  getAllEvents,
  getSingleEvent,
  updateExistingEvent,
  deleteExistingEvent,
  getEventsFilteredByDate,
  getMyEvents,
} = require("../controllers/eventsController");

const { protect } = require("../middleware/authMiddleware");

router.get("/filter", getEventsFilteredByDate);
router.get("/user-events", protect, getMyEvents);
router.get("/", getAllEvents);
router.get("/:id", getSingleEvent);
router.post("/", protect, createNewEvent);
router.put("/:id", protect, updateExistingEvent);
router.delete("/:id", protect, deleteExistingEvent);

module.exports = router;
