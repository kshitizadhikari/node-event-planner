const { createTag, getTags, deleteTag } = require("../models/tagsModel");

const createNewTag = async (req, res) => {
  const { name } = req.body;
  try {
    const tag = await createTag(name);
    res.status(201).json(tag);
  } catch (err) {
    if (err.code === "23505") {
      return res
        .status(400)
        .json({ message: `Tag name '${name}' already exists` });
    }
    res.status(500).json({ message: err.message });
  }
};

const getAllTags = async (req, res) => {
  try {
    const tags = await getTags();
    res.json(tags);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteExistingTag = async (req, res) => {
  try {
    const event = await deleteTag(req.params.id);
    if (!event) return res.status(404).json({ message: "Tag not found" });
    res.json({ message: "Tag deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createNewTag,
  getAllTags,
  deleteExistingTag,
};
