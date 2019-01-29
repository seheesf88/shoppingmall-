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

// router.get('/', (req, res) =>{
// 	Item.find({}, (err, allItems) => {
// 		res.render('admin/index.ejs', {
// 			items : allItems
// 		})
// 	})
// })

router.get('/new', (req, res) => {
	res.render('admin/new.ejs')
})

router.get('/:id', (req, res) => {
	Item.findById(req.params.id, (err, foundItem) => {
		if(err){
			res.send(err)
		}else{
			res.render('admin/show.ejs', {
				item : foundItem
			})
		}
	})
})

router.get(':/id/edit', (req, res) => {
	Item.findById(req.params.id, (err, foundItem) => {
		res.render('admin/edit.ejs',{
			item : foundItem
		})
	})
})

router.post('/', (req, res) => {
	Item.create(req.body, (err, createdItem) => {
		if(err){
			res.send(err)
		}else{
			res.redirect('/admin')
		}
	})
})

router.put('/:id', (req, res) => {
	Item.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedItem) => {
		if(err){
			res.send(err)
		}else{
			res.redirect('/admin')
		}
	})
})

// router.delete('/:id', (req, res) => {
// 	Item.findByIdAndRemove(req.params.id, (err, deletedItem) => {
// 		const userIds = [];
//
//
// 	})
// })
module.exports = router;
