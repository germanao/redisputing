const express = require("express");
const dotenv = require("dotenv");
const database = require("./src/config/database");
const routes = require("./src/routes/index.routes");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

dotenv.config();
database();

app.use("/api/users", routes)

const PORT = process.env.PORT || 5001;
app.listen(PORT, (req, res) => {
  console.log(`Server started on port ${PORT} 🔥`);
});
