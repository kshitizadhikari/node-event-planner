require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const eventRoutes = require("./routes/eventRoutes");

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/events", eventRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on port 'http://localhost:${PORT}'`)
);
