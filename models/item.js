const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
	imageUrl : String,
	name : String,
	price : Number
});

const Item = mongoose.model("Items", itemSchema);

module.exports = Item;