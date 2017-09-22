const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoClient = require("mongodb").MongoClient;
const favorites = require("./controllers/favorites");
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname + "public")));

app.use("/", favorites);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});