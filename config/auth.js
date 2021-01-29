module.exports = {
  //*Add this middleware to any route that needs to be protected
  ensureAuthentication: function (request, response, next) {
    if (request.isAuthenticated()) {
      return next();
    }
    request.flash("error", "Please log in to view this page");
    response.redirect("/users/login");
  },
};
