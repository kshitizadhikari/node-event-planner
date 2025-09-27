const {
  createEvent,
  updateEvent,
  getEvent,
  deleteEvent,
  getEvents,
  getEventsByDate,
} = require("../models/eventsModel");
const { EventDateType } = require("../constants/enums");
const { isValidEventDateType } = require("../utils/utils");

// Create a new event
const createNewEvent = async (req, res) => {
  try {
    const { title, description, date_time, location, type } = req.body;
    const user_id = req.user.userId; // from auth middleware
    const event = await createEvent(
      title,
      description,
      date_time,
      location,
      type,
      user_id
    );
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all events
const getAllEvents = async (req, res) => {
  try {
    const events = await getEvents();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single event by ID
const getSingleEvent = async (req, res) => {
  try {
    const event = await getEvent(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update an event (owner only)
const updateExistingEvent = async (req, res) => {
  try {
    const { title, description, date_time, location, type } = req.body;
    const user_id = req.user.userId;
    const event = await updateEvent(
      req.params.id,
      title,
      description,
      date_time,
      location,
      type,
      user_id
    );
    if (!event)
      return res
        .status(404)
        .json({ message: "Event not found or not authorized" });
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete an event (owner only)
const deleteExistingEvent = async (req, res) => {
  try {
    const user_id = req.user.userId;
    const event = await deleteEvent(req.params.id, user_id);
    if (!event)
      return res
        .status(404)
        .json({ message: "Event not found or not authorized" });
    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get past or upcoming events
const getEventsFilteredByDate = async (req, res) => {
  try {
    const type = req.query.type?.toLowerCase();
    console.log(isValidEventDateType(type));
    if (!type || ![EventDateType.PAST, EventDateType.UPCOMING].includes(type)) {
      return res
        .status(400)
        .json({ message: "Invalid type. Use 'past' or 'upcoming'." });
    }

    const events = await getEventsByDate(type.toLowerCase());
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createNewEvent,
  getAllEvents,
  getSingleEvent,
  updateExistingEvent,
  deleteExistingEvent,
  getEventsFilteredByDate,
};
