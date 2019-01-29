const express = require("express");
const app = express();
require("./db/db");
const adminControllers = require("./controllers/adminControllers");
const userControllers = require("./controllers/userControllers");
const authControllers = require("./controllers/authControllers");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const session = require("express-session");

app.use(session({
  secret: "THIS IS A RANDOM STRING SECRET",
  resave: false,
  saveUninitialized: false
}));

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: false}));

app.use('/admins', adminControllers);
app.use('/users', userControllers);
app.use("/auths", authControllers);

app.get("/", (req, res) => {
	res.redirect("/auths/login");
});




app.listen(3000, () => {
  console.log('listening on port 3000');
});