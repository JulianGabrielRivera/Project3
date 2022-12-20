// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");
const { isAuthenticated } = require("./middleware/jwt.middleware");
const app = express();

require("./config/session.config")(app);

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
// Contrary to the views version, all routes are controlled from the routes/index.js

// order matters for these

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);
const allRoutes = require("./routes/index.routes");
app.use("/api", allRoutes);

const commentRoutes = require("./routes/comment.routes");
app.use("/api", commentRoutes);

const placeRoutes = require("./routes/place.routes");
app.use("/api", placeRoutes);
const likeRoutes = require("./routes/likes.routes");
app.use("/api", likeRoutes);

const userRoutes = require("./routes/user.routes");
app.use("/api", isAuthenticated, userRoutes);

const orderRoutes = require("./routes/orders.routes");
app.use("/api", isAuthenticated, orderRoutes);
// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
