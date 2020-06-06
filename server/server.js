const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cron = require("node-cron");

const users = require("./routes/api/users");
const books = require("./routes/api/books");
const students = require("./routes/api/students")
const records = require("./routes/api/records")
const mailer = require("./routes/api/mailer").borrow;
const sports = require("./routes/api/sports");
const spRecords = require("./routes/api/recordSports");

const app = express();

// Body parser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());;

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);
app.use("/api/books", books);
app.use("/api/students", students);
app.use("/api/records", records);
app.use("/api"/mailer, mailer);
app.use("/api/sports", sports)
app.use("/api/recordSports", spRecords);
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
