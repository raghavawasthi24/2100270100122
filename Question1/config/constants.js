require("dotenv").config();
const constant = {
  PORT: process.env.PORT || 5000,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY,
  EXTERNAL_API_URL: process.env.EXTERNAL_API_URL,
};
module.exports = constant;
