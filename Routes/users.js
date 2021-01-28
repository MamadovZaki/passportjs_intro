const express = require("express");
const router = express.Router();

router.get("/login", (request, response) => {
  response.send("Login");
});

router.get("/register", (request, response) => {
  response.send("Register");
});

module.exports = router;
