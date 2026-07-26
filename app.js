require("dotenv").config();

const dns = require("dns");

dns.setServers([
    "8.8.8.8",
    "1.1.1.1"
]);

const express = require("express");
const cors = require("cors"); 
const path = require("path");


const userRoute = require("./routes/user");
const userLogger = require("./middleware/logger");
const userErrorHandle = require("./middleware/errorhandle");
const connectDB = require("./database/db");


const PORT = process.env.PORT || 4000

const app = express();


app.use(express.json()); 
app.use(cors());
app.use(userLogger); 


connectDB();
 
app.use("/work", userRoute);


app.get("/", (req, res) => {
    res.send(`The Beginning of the advanced class`);
});


app.use(userErrorHandle);


app.listen(PORT, () => {
    console.log(`Listening from http://localhost:${PORT}`);
});