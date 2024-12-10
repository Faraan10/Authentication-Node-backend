const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const connection = require("./dbConnection");
const URL = require("./models/url");
// The below line is for locating ejs files for server side rendering
const path = require("path");
// the data / token will be stored in cookies in local system
// ( used for stroring data locally )
const cookieParser = require("cookie-parser");
const { restrictToLoggedInUserOnly, checkAuth } = require("./middlewares/auth");

// imported static route for rendering ejs pages
const staticRoute = require("./routes/staticRouter");

connection();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// this is for rendering server side rendering
app.use("/", checkAuth, staticRoute);
// ejs for server side rendering ( Embedded Javascript )
// ejs is a templating engine which is compatible with express and is
// used for server side rendereing
// the below line is used to tell that we are using ejs as our engine
// for redering the HTML files
app.set("view engine", "ejs");

// We have to tell express that we are storing ejs files at some location
// basically telling express that the ejs files are located in views folder
app.set("views", path.resolve("./views"));

app.use("/url", restrictToLoggedInUserOnly, require("./routes/url"));
app.use("/user", require("./routes/user"));

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
