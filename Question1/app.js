const express = require("express");
const constants = require("./config/constants");
const cors = require("cors");
const tokenMiddleware = require("./middleware/auth");
const router = require("./routes/productsRoutes");
require("dotenv").config();

const app = express();
app.use(cors());

// Set trust proxy for reverse proxy support
app.set("trust proxy", 1);

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(tokenMiddleware);

// Import and use the routers
app.use(`/api`, router);
// Start the server
app.listen(constants.PORT, () =>
  console.log(`Server running at port ${constants.PORT}`)
);
