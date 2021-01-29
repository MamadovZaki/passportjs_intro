const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
//*User model
const User = require("../Models/Users");
const passport = require("passport");

//*login page
router.get("/login", (request, response) => {
  response.render("login");
});

//*register page
router.get("/register", (request, response) => {
  response.render("register");
});

//todo: register handle
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

  //*What happens after an error is displayed?
  if (errors.length > 0) {
    response.render("register", {
      errors,
      name,
      email,
      password,
      password2,
    });
  } else {
    //successful validation
    // todo: check if user already exists
    User.findOne({ email }).then((user) => {
      if (user) {
        errors.push({ msg: "Email is already registered" });
        response.render("register", {
          errors,
          name,
          email,
          password,
          password2,
        });
      } else {
        //user doesn't exist
        const newUser = new User({
          name,
          email,
          password,
        });
        //has password
        bcrypt.genSalt(10, (error, salt) =>
          bcrypt.hash(newUser.password, salt, (error, hash) => {
            if (error) throw error;
            //*set password to hashed
            newUser.password = hash;
            //*save the user
            newUser
              .save()
              .then((user) => {
                console.log("Saved new user to the database");
                request.flash("success_msg", "You are now registered!");
                response.redirect("/users/login");
              })
              .catch((error) => console.log(error));
          })
        );
      }
    });
  }
});

//todo: login handle
router.post("/login", (request, response, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(request, response, next);
});

//todo: logout handle
router.get("/logout", (request, response) => {
  request.logout();
  request.flash("Succes_msg", "You are logged out out");
  response.redirect("/users/login");
});
module.exports = router;
