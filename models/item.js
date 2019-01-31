const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
	imageUrl 		: {type: String, required: true},
	name 				: {type: String, required: true},
	price 			: {type: Number, required: true},
	category		: {type: String, required: true},
	description	: {type: String, required: true},
	location		: {type: String, required: true},
	inStock			: {type: String, required: true}
});

const Item = mongoose.model("Items", itemSchema);

module.exports = Item;
