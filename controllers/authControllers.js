const express = require('express');
const router  = express.Router();

router.get("/login", (req,res) =>{
	try{
		res.render("index.ejs");
	}
	catch(err){
		res.send(err);
	}
});


module.exports = router;