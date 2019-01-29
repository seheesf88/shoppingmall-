const express = require('express');
const router  = express.Router();
const User = require("../models/user")



router.get("/homePage", async (req,res) => {
	try{

		// Render the home page for the user 
		const foundUser = await User.findOne({"email": req.session.email});
		console.log(foundUser);

		res.render("homePage.ejs", {
			foundUser
		});
	}

	catch(err){
		res.send(err);
	}
});


module.exports = router;