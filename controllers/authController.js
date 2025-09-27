const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createUser, getUserByName } = require("../models/usersModel");
const JWT_SECRET = process.env.JWT_SECRET;

const register = async (req, res) => {
  try {
    const { first_name, last_name, username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser(
      first_name,
      last_name,
      username,
      hashedPassword
    );

    res.status(201).json({
      message: "User registered successfully",
      user: { id: user.id, username: user.username },
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    const user = await getUserByName(username);
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ message: "Login error", error: err.message });
  }
};

module.exports = {
  register,
  login,
};
