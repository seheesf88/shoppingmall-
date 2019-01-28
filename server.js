const express = require("express");
const app = express();
require("./db/db");
const itemControllers = require("./controllers/itemControllers");
const userControllers = require("./controllers/userControllers");
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

app.use('/items', itemControllers);
app.use('/users', userControllers);

app.get("/", (req, res) => {
	try{
		res.render("index.ejs");
	}

	catch(err){
		res.send(err);
	}

});




app.listen(3000, () => {
  console.log('listening on port 3000');
});