const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Item = require("./item");

const userSchema = new Schema({
	firstName : String,
	lastName : String,
	email : {
		type : String,
		unique : true
	},
	hashedPassword : String,
	admin : Boolean,
	itemsBrowsed : [Item.schema],
	itemsBought : [Item.schema]
});

const User = mongoose.model("User", userSchema);

module.exports = User;