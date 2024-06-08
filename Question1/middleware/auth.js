const axios = require("axios");

const TOKEN_SERVER_URL = "http://20.244.56.144/test/auth";

const tokenRequestBody = {
  companyName: "goMart",
  clientID: "6c266b7d-3272-4e71-874a-f23201ea584a",
  clientSecret: "eoNlUSNMQdkYpKkd",
  ownerName: "Pushkar Khare",
  ownerEmail: "work.pushkarkhare@gmail.com",
  rollNo: "2100270100120",
};
let token = null;
let tokenExpiration = null;

const isTokenValid = () => {
  if (!token || !tokenExpiration) {
    return false;
  }
  const currentTime = Math.floor(Date.now() / 1000);
  return currentTime < tokenExpiration;
};

const tokenMiddleware = async (req, res, next) => {
  try {
    if (!isTokenValid()) {
      console.log("Fetching new token...");
      const response = await axios.post(TOKEN_SERVER_URL, tokenRequestBody);
      token = response.data.access_token;
      tokenExpiration = response.expires_in;
    } else {
      console.log("Using existing token.");
    }
    req.headers["Authorization"] = `Bearer ${token}`;
    next();
  } catch (error) {
    console.error("Error fetching token:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = tokenMiddleware;
