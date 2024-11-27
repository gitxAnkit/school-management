const { pool } = require("../config/dbConnection");
const express = require('express');
const { getSchools } = require("../controllers/schoolController");
const router = express.Router();

router.get("/listSchools", getSchools);

module.exports = router;