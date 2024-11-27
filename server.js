const app = require("./app");
const dotenv = require('dotenv');

dotenv.config({ path: "./config/.env" });

const PORT = process.env.PORT || 300;
const server = app.listen(PORT, () => { console.log(`Server started at ${PORT}`) });