const express = require('express');
const router  = express.Router();


router.get("/homePage", (req,res) => {
	try{
		res.render("homePage.ejs");
	}

	catch(err){
		res.send(err);
	}
});


module.exports = router;