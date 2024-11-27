const { pool } = require("../config/dbConnection");
const catchAsyncErrors = require("../utils/catchAsyncErrors");

exports.getSchools = catchAsyncErrors(async (req, res) => {
    const [schools] = pool.query('SELECT * FROM schools');
    console.log("Schools: ", schools);
    res.json({
        schools: schools
    });
});