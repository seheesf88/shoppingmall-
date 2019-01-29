const express = require('express');
const router  = express.Router();
const User = require("../models/user");
const Item = require("../models/item");


// Get route got /homePage
router.get("/homePage", async (req,res) => {
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


module.exports = router;