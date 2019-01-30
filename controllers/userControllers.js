const express = require('express');
const router  = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const Item = require("../models/item");


// Get route got /homepage
router.get("/homepage", async (req,res) => {
	try{

		// Render the home page for the user 
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


// Get route for /orderhistory
router.get("/orderhistory", async (req, res) => {
	try{
		const currentUser = await User.findOne({"email" : req.session.email});
		res.render("users/orderHistory.ejs", {
			currentUser
		});

	}

	catch(err){
		res.send(err);
	}
});


// Show route for /items info
router.get("/items/:id", async(req, res) => {
	const showItem = await Item.findById(req.params.id);
	res.render("users/itemInfo.ejs", {
		showItem
	});
});


// Show route for /buy [Items that are bought]
router.get("/buy/:id", async (req,res) => {
	const showItem = await Item.findById(req.params.id);
	res.render("users/buyItem.ejs", {
		showItem
	});
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



// Post request on /users/cardVerify [Verify card info]
router.delete("/cardVerify/:id", async (req, res) => {
	try{
		// Since the item is bought, it needs to be removed from the database, added to the user who bought it 
		//and then the user must be redirected to a "thank you for shopping" page
		const deletedItem = await Item.findByIdAndRemove(req.params.id);
		console.log("deletedItem : " +deletedItem);
		const buyingUser = await User.findOne({"email" : req.session.email});
		console.log("buyingUser : " +buyingUser);
		buyingUser.itemsBought.push(deletedItem);
		buyingUser.save();
		res.render("users/thankYou.ejs");
	}

	catch(err){
		res.send(err);
	}
});





module.exports = router;