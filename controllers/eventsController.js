const {
  createEvent,
  updateEvent,
  getEvent,
  deleteEvent,
  getEvents,
  getEventsByDate,
  getUserEvents,
  getEventsByTags,
} = require("../models/eventsModel");
const { EventDateType } = require("../constants/enums");
const { isValidEventDateType } = require("../utils/utils");
const { assignTagsToEvent } = require("../models/eventTagsModel");

const createNewEvent = async (req, res) => {
  try {
    const { title, description, date_time, location, type, tag_ids } = req.body;
    const user_id = req.user.userId; // from auth middleware
    const event = await createEvent(
      title,
      description,
      date_time,
      location,
      type,
      user_id
    );

    const tags = await assignTagsToEvent(event.id, tag_ids);
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

const getEventsFiltered = async (req, res) => {
  try {
    const { tags, type } = req.query;
    let events = [];

    // 1️⃣ Filter by date if type is provided
    if (type) {
      const allowedTypes = ["past", "upcoming"];
      if (!allowedTypes.includes(type.toLowerCase())) {
        return res
          .status(400)
          .json({ message: "Invalid type. Use 'past' or 'upcoming'." });
      }
      events = await getEventsByDate(type.toLowerCase());
    }

    // 2️⃣ Filter by tags if tags param exists
    if (tags) {
      const tagArray = tags.split(",").map((t) => t.trim());
      const eventsByTags = await getEventsByTags(tagArray);

      // If we already filtered by date, take intersection
      if (events.length > 0) {
        const eventIds = new Set(events.map((e) => e.id));
        events = eventsByTags.filter((e) => eventIds.has(e.id));
      } else {
        events = eventsByTags;
      }
    }

    // 3️⃣ If no filters, return all events
    if (!tags && !type) {
      events = await getEvents();
    }

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
  getMyEvents,
  getEventsFiltered,
};
