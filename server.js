require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const eventRoutes = require("./routes/eventRoutes");
const tagRoutes = require("./routes/tagRoutes");
const eventTagRoutes = require("./routes/eventTagRoutes");

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/events", eventRoutes);
app.use("/tags", tagRoutes);
app.use("/event-tags", eventTagRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on port 'http://localhost:${PORT}'`)
);
