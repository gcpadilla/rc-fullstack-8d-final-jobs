const mongoose = require("mongoose");
mongoose.connect(`mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

let db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
	console.log("mongo se conecto satisfactoriamente..");
});