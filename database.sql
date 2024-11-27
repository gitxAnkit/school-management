CREATE DATABASE IF NOT EXISTS school_management;

CREATE TABLE schools (
    school_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    address VARCHAR(255),
    latitude FLOAT,
    longitude FLOAT
);
// sample data 
INSERT INTO schools (name, address, latitude, longitude)
VALUES
    ('Green Valley High', '123 Elm Street', 40.712776, -74.005974),
    ('Blue Ridge Academy', '456 Oak Avenue', 34.052235, -118.243683),
    ('Sunshine Elementary', '789 Pine Lane', 41.878113, -87.629799),
    ('Riverdale School', '321 Maple Road', 37.774929, -122.419416),
    ('Hillcrest Academy', '654 Cedar Street', 47.606209, -122.332071);
