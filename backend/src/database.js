const mongoose = require("mongoose");
mongoose.connect(
	//`mongodb+srv://${process.env.USER_MONGODB}:${process.env.PASS_MONGODB}@${process.env.DB_ATLAS}.mongodb.net/Cluster0?retryWrites=true&w=majority`
	 
	`mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`
	 ,
	{
	  // useNewUrlParser: true,
	  // useUnifiedTopology: true,
	  // useCreateIndex: true,
	  // useFindAndModify: false,
	  // autoIndex: false, // Don't build indexes
	  // poolSize: 10, // Maintain up to 10 socket connections
	  // serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
	  // socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
	  // family: 4, // Use IPv4, skip trying IPv6
	  // keepAlive: true, keepAliveInitialDelay: 30000
  
	  useNewUrlParser: true,
	  useUnifiedTopology: true,
	  useCreateIndex: true,
	  useFindAndModify: false,
	}
  );

let db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
	console.log("Mongo se conecto, ya tienes acceso a la base de datos. . .");
});