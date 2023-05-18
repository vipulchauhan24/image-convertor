const express = require("express");
const app = express();

var bodyParser = require("body-parser");

const rootRoutes = require('./app/routes/Root.routes');

// View engine setup
app.set("view engine", "ejs");
app.set("view options", {
  layout: false,
});
// setup middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', rootRoutes);

app.listen(3000, (err) => {
  if (err) console.error("Setup failed!");
  console.info("Setup success!");
});
