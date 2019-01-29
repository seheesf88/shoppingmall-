const express = require('express');
const router  = express.Router();
const User = require("../models/user");
const Item = require("../models/item");


//index
router.get("/homePage", async (req,res) => {
	try{
		const foundUser = await User.findOne({"email": req.session.email});
		const allItems = await Item.find({});
		res.render("homePage.ejs", {
			foundUser,
			allItems
		});
	}catch(err){
		res.send(err);
	}
});

//new
router.get("/new", (req, res) => {
	try{
		res.render("admins/new.ejs");
	}catch(err){
		res.send(err);
	}
});

//create item
router.post("/homePage", async (req, res) => {
	try{
		const itemCreated = await Item.create(req.body);
		res.redirect("/admins/homePage");
	}catch(err){
		res.send(err);
	}
});

//show
router.get('/:id', async(req, res) => {
	try {
		const foundItem = await Item.findById(req.params.id);
		res.render('admins/show.ejs', {
			item : foundItem
		})
	}catch(err){
		res.send(err)
	}
})

//edit
router.get('/:id/edit', async(req, res) => {
	try {
		const foundItem = await Item.findById(req.params.id)
		res.render('admins/edit.ejs', {
			item : foundItem
		})
	}catch(err){
		res.send(err)
	}
})


router.put('/:id', async(req, res) => {
	try {
		const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {new: true})
		res.redirect('/admins/homePage')
	}catch(err){
		res.send(err)
	}
})

//delete
router.delete('/:id', (req, res) => {
	Item.findByIdAndRemove(req.params.id, (err, deletedItem) => {
		if(err){
			res.send(err)
		}else{
			res.redirect('/admins/homePage')
		}
	})
})
module.exports = router;
