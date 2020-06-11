const express = require("express");

require("dotenv").config();
const cors = require("cors");
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

require("./database");


app.listen(port, () =>
	console.log(`app listening at http://localhost:${port}`)
);