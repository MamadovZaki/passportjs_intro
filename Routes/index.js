const express = require("express");
const router = express.Router();

router.get("/", (request, response) => {
  response.render("welcome");
});

router.get("/dashboard", (request, response) => {
  response.render("dashboard");
});
module.exports = router;
