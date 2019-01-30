const express = require('express');
const router  = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const Item = require("../models/item");



router.get("/homepage", async (req,res) => {
	try{

		// Render the home page for the user
		const foundUser = await User.findOne({"email": req.session.email});
		const allItems = await Item.find({});
		console.log(foundUser);

		res.render("homepage.ejs", {
			foundUser,
			allItems
		});
	}

	catch(err){
		res.send(err);
	}
});


module.exports = router;

// Get route for /profile
router.get("/profile", async (req, res) => {
	try{
		// Get the current user and redirect him to his user page
		const currentUser = await User.findOne({"email" : req.session.email});
		// console.log(currentUser);
		req.session.message = " ";
		res.redirect("/users/profile/"+currentUser._id+"/edit");
	}

	catch(err){
		res.send(err);
	}
});

// Edit route for user profile
router.get("/profile/:id/edit", async (req, res) => {
	try{
		// Render the edit page for the user
		console.log("In edit route");
		// const currentUser = await User.findOne({"email": req.session.email});
		const currentUser = await User.findById(req.params.id);
		console.log(currentUser);
		res.render("users/profile.ejs", {
			currentUser,
			message: req.session.message
		});
	}

	catch(err){
		res.send(err);
	}
});

// Update route for user profile
router.put("/profile/:id", async (req, res) => {
	try{
		// console.log(" Req body before: " + req.body);
		// console.log("Request received");

		// Need to get the new password and encrypt it before updating object in database
		 const hashedPassword = bcrypt.hashSync(req.body.hashedPassword, bcrypt.genSaltSync(10));
		 req.body.hashedPassword = hashedPassword;
		// console.log(" Req body after: "+req.body);


		// Updates user fn, ln, email and password with new info
		// const updatedUser = await User.findOneAndUpdate({"email": req.session.email}, req.body, {new: true});
		const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
		console.log("updatedUser" + updatedUser);

		req.session.message = "Profile updated";
		res.redirect("/users/profile/"+updatedUser._id+"/edit");
	}

	catch(err){
		res.send(err);
	}
});


// U


module.exports = router;
