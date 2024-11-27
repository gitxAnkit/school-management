const express = require('express');
const cors = require('cors');
const app = express();
const schoolRoute = require("./routes/schoolRoutes");

// Middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

//Routes
app.use("/api/v1", schoolRoute);

module.exports = app;