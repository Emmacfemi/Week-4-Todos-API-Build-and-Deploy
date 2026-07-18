require("dotenv").config();

const userRoute = require("./routes/user");
const userLogger = require("./middleware/logger");
const userErrorHandle = require("./middleware/errorhandle");


const express = require("express");
const cors = require("cors");
const path = require("path");

const PORT = process.env.PORT || 4000

const app = express();

app.use(express.json()); 
app.use(cors());
app.use(userLogger); 

app.use(express.static(path.join(__dirname, "public")));

app.use("/work", userRoute);

app.get("/home", (req, res) => {
    res.status(200).json(path.join(__dirname, "new", "index.html"));
});

app.get("/", (req, res) => {
    res.send(`The Beginning of the advanced class`);
});


app.use(userErrorHandle);


app.listen(PORT, () => {
    console.log(`Listening from http://localhost:${PORT}`);
});