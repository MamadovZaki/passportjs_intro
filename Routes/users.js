const express = require("express");
const router = express.Router();

//*login page
router.get("/login", (request, response) => {
  response.render("login");
});

//*register page
router.get("/register", (request, response) => {
  response.render("register");
});

//*register handle
router.post("/register", (request, response) => {
  const { name, email, password, password2 } = request.body;
  let errors = [];

  //*Check required fields
  if (!name || !email || !password || !password2) {
    errors.push({ msg: "Please fill in all fields " });
  }

  //*Check password match
  if (password !== password2) {
    errors.push({ msg: "Passwords don't match" });
  }

  //*Check password length
  if (password.length < 6) {
    errors.push({ msg: "Password should be at least 6 characters" });
  }
});

module.exports = router;
