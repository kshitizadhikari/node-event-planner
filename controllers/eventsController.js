const {
  createEvent,
  updateEvent,
  getEvent,
  deleteEvent,
  getEvents,
  getEventsByDate,
  getUserEvents,
} = require("../models/eventsModel");
const { EventDateType } = require("../constants/enums");
const { isValidEventDateType } = require("../utils/utils");

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

const getAllEvents = async (req, res) => {
  try {
    const events = await getEvents();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getMyEvents = async (req, res) => {
  try {
    const user_id = req.user.userId;
    const events = await getUserEvents(user_id);
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingleEvent = async (req, res) => {
  try {
    const event = await getEvent(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

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

const getEventsFilteredByDate = async (req, res) => {
  try {
    const type = req.query.type?.toLowerCase();
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
  getMyEvents,
};
