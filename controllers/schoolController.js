const { pool } = require("../config/dbConnection");
const catchAsyncErrors = require("../utils/catchAsyncErrors");

// @desc Function to calculate distance using Haversine formula
const calculateDistance = (lat1, lon1, lat2, lon2) => {

    const R = 6371;  // Radius of the Earth in kilometers

    // Degrees to radians
    const toRad = (deg) => deg * (Math.PI / 180);
    // Convert coordinates to radians
    const lat1Rad = toRad(lat1);
    const lon1Rad = toRad(lon1);
    const lat2Rad = toRad(lat2);
    const lon2Rad = toRad(lon2);

    // Differences in coordinates
    const deltaLat = lat2Rad - lat1Rad;
    const deltaLon = lon2Rad - lon1Rad;

    // Haversine formula
    const a = Math.sin(deltaLat / 2) ** 2 +
        Math.cos(lat1Rad) * Math.cos(lat2Rad) *
        Math.sin(deltaLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // Distance in kilometers
    let distance = R * c;
    distance = Math.round(distance * 1000) / 1000;
    return distance;
}

// @desc Get all schools in sorted order
// @route GET /listSchools
exports.getSchools = catchAsyncErrors(async (req, res, next) => {
    const { userLatitude, userLongitude } = req.query;

    const [schools] = await pool.query('SELECT * FROM schools');

    let schoolsUpdated;

    if (userLatitude && userLongitude) {
        const latitude = parseFloat(userLatitude);
        const longitude = parseFloat(userLongitude);

        if (isNaN(latitude) || isNaN(longitude)) {
            return res.status(400).json({
                success: false,
                message: "Invalid latitude or longitude values."
            });
        }

        schoolsUpdated = schools.map((school) => {
            const distance = calculateDistance(
                school.latitude,
                school.longitude,
                latitude,
                longitude
            );
            return { ...school, distance };
        }).sort((a, b) => a.distance - b.distance);
    } else {
        schoolsUpdated = schools;
    }

    res.status(200).json({
        success: true,
        count: schoolsUpdated.length,
        schools: schoolsUpdated,
    });
});


// @desc Add new school
// @route POST /addSchool
exports.createSchool = catchAsyncErrors(async (req, res, next) => {
    const { name, address, latitude, longitude } = req.body;

    const errors = [];
    if (!name || typeof name !== 'string' || name.trim().length < 3) {
        errors.push('Name must be a non-empty string with at least 3 characters');
    }
    if (!address || typeof address !== 'string' || address.trim().length < 5) {
        errors.push('Address must be a non-empty string with at least 5 characters');
    }
    if (latitude !== undefined) {
        const lat = parseFloat(latitude);
        if (isNaN(lat) || lat < -90 || lat > 90) {
            errors.push('Latitude must be a number between -90 and 90');
        }
    }
    if (longitude !== undefined) {
        const lon = parseFloat(longitude);
        if (isNaN(lon) || lon < -180 || lon > 180) {
            errors.push('Longitude must be a number between -180 and 180');
        }
    }
    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: 'Validation Failed',
            errors: errors
        });
    }
    const [result] = await pool.query(
        'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
        [name.trim(),
        address.trim(),
        latitude ? parseFloat(latitude) : null,
        longitude ? parseFloat(longitude) : null]
    );

    res.status(201).json({
        success: true,
        message: 'School created successfully',
        schoolId: result.insertId
    });
})