const express = require('express');
const router  = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/user")


// Get route for /login
router.get("/login", (req,res) =>{
	try{

		res.render("index.ejs", {
			message : req.session.message
		});
	}
	catch(err){
		res.send(err);
	}
});

// Get route for /logout
router.get("/logout", (req,res) => {
	try{
		console.log("Before logout: "+ req.session);
		req.session.destroy();
		res.redirect("/auths/login");
		console.log("After logout: "+ req.session);
	}

	catch(err){
		res.send(err);
	}
});



// New & Create route for /login
router.post("/login", async (req, res) => {
	try{

		// If user selects the option to register his account, you want to collect his
		// info and feed that info into the database
		if(req.body.registerEmail){

			console.log("Successfully created an account");
			// Converting password to hashed password
			const password = req.body.registerPassword;
			const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));


			// Creating user/ admin object
			// console.log(req.body);
			const userObject = {};
			userObject.firstName = req.body.registerFN;
			userObject.lastName = req.body.registerLN;
			userObject.email = req.body.registerEmail;
			userObject.hashedPassword = hashedPassword;
			userObject.itemsBrowsed = [];
			userObject.itemsBought = [];
			if(userObject.email === "admin@gmail.com")
				userObject.admin = true;
			else
				userObject.admin = false;


			// Storing user object into the database
			const createdUser = await User.create(userObject);
			console.log("createdUser " + createdUser);


			// Storing current user email and loggedProperty in session and redirect them to the home page depending
			// on whether they are and admin or user
			req.session.email = userObject.email;
			req.session.logged = true;
			req.session.message = " ";
			if(!userObject.admin)
				res.redirect("/users/homepage");
			else
				res.redirect("/admins/homepage");
		}



		// If user selects the option to login to his account, they have to be redirected to
		// the home page on successful login
		else{
			const foundUser = await User.findOne({"email": req.body.loginEmail});


			if(foundUser){
				// If user/admin enters proper login details, redirect them to the home page after storing their info into session object
				if(bcrypt.compareSync(req.body.loginPassword, foundUser.hashedPassword)){
					console.log("loggedIn" +foundUser);
					req.session.email = req.body.loginEmail;
					req.session.logged = true;
					req.session.message = " ";
					if(foundUser.admin)
						res.redirect("/admins/homepage");
					else
						res.redirect("/users/homepage");
				}


				// If wrong password is entered, show generic error message and redirect to login page
				else{
					req.session.message = " Incorrect email or password entered. If you don't have an account, please register."
					res.redirect("/auths/login");
				}
			}


			// If user is not found, show generic error message and redirect them to login page
			else{
				req.session.message = " Incorrect email or password entered. If you don't have an account, please register."
				res.redirect("/auths/login");
			}
		}
	}

	catch(err){
		req.session.message = "Email already exists. Please create an account with a new email";
		res.redirect("/auths/login");

		// res.send(err);
	}
});


module.exports = router;
