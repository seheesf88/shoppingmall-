const express = require('express');
const router  = express.Router();
const User = require("../models/user");
const Item = require("../models/item");



// This is test admin code I wrote to make sure the user can see the items once created
router.get("/homePage", async (req,res) => {
	try{
		// Render the home page for the admin
		const foundUser = await User.findOne({"email": req.session.email});
		const allItems = await Item.find({});

		console.log(foundUser);
		res.render("homePage.ejs", {
			foundUser,
			allItems
		});
	}

	catch(err){
		res.send(err);
	}
});


router.get("/new", (req, res) => {
	try{
		res.render("admins/new.ejs");
	}

	catch(err){
		res.send(err);
	}
});

router.post("/homePage", async (req, res) => {
	try{
		const itemCreate = await Item.create(req.body);
		res.redirect("/admins/homePage");
	}

	catch(err){
		res.send(err);
	}
});

module.exports = router;