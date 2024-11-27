const app = require("./app");
const dotenv = require('dotenv');
dotenv.config({ path: "./config/.env" });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`)
});
