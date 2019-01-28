const mongoose = require("mongoose");

//connection string assumed to be port 27017 if not specified
const connectionString = "mongodb://localhost:27017/project2";

mongoose.connect(connectionString, {
	useNewUrlParser : true,
	useCreateIndex : true,
	useFindAndModify : false
});

mongoose.connection.on("connected", () => {
	console.log("connected to " + connectionString);
});

mongoose.connection.on("error", err => {
	console.log(err);
});

mongoose.connection.on("disconnected", () => {
	console.log("disconnected from " + connectionString);
});