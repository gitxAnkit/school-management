const { pool } = require("../config/dbConnection");
const express = require('express');
const { getSchools, createSchool } = require("../controllers/schoolController");

const router = express.Router();

router.get("/listSchools/:userLatitude/:userLongitude", getSchools);
router.post("/addSchool", createSchool);

module.exports = router;