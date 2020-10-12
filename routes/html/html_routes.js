// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");
var db = require("../../models/");

// Routes
// =============================================================
module.exports = function (app) {
  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get("/", checkNotAuth, function (req, res) {
    res.render("home");
  });

  app.get("/login", checkNotAuth, function (req, res) {
    res.render("login");
  });

  app.get("/logout", checkAuth, function (req, res) {
    req.logout();
    res.redirect("/");
  });

  app.get("/signup", checkNotAuth, function (req, res) {
    res.render("signup");
  });

  app.get("/dashboard", checkAuth, function (req, res) {
    db.Stock.findAll({
      attributed: ["name"],
      where: {
        // user_id is the column name in the database
        // req.user.id is the id of the user signed in
        user_id: req.user.id,
      },
    }).then((data) => {
      let stocks = [];
      data.forEach((element) => {
        stocks.push(element.dataValues);
      });
      res.render("dashboard", { stocks: stocks });
    });
  });

  // Middleware to not allow access to the list without being signed in
  function checkAuth(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/");
  }
  function checkNotAuth(req, res, next) {
    if (req.isAuthenticated()) {
      res.redirect("/dashboard");
    }
    return next();
  }
};
