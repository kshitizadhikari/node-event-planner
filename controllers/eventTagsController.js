const {
  assignTagsToEvent,
  removeTagsFromAnEvent,
} = require("../models/eventTagsModel");

const assignTagsToAnEvent = async (req, res) => {
  try {
    console.log(req.body);
    const { event_id, tag_ids } = req.body;

    if (!event_id || !Array.isArray(tag_ids) || tag_ids.length === 0) {
      return res.status(400).json({
        message: "event_id and a non-empty tag_ids arrays is required",
      });
    }
    const result = await assignTagsToEvent(event_id, tag_ids);

    if (result.length === 0) {
      return res
        .status(200)
        .json({ message: "All provided tags were already assigned" });
    }

    res.status(201).json({
      message: "Tags assigned successfully",
      assigned: result,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const removeTags = async (req, res) => {
  try {
    const { event_id, tag_ids } = req.body;

    if (!event_id || !Array.isArray(tag_ids) || tag_ids.length === 0) {
      return res.status(400).json({
        message: "event_id and a non-empty tag_ids array are required",
      });
    }

    const removed = await removeTagsFromAnEvent(event_id, tag_ids);
    res.json({
      message: "Tags removed successfully",
      removed,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  assignTagsToAnEvent,
  removeTags,
};
