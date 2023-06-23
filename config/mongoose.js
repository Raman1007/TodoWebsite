const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://raman10:raman10@cluster0.0gzmiic.mongodb.net/");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "error connecting to db"));
db.once("open", function () {
	console.log("Successfully connected to the database");
});
