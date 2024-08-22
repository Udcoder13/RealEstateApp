const express = require('express')
const dbConnect = require('./DB')
const userRoute = require('./Router/userRoute')
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

dbConnect();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// app.use("/api/user",userRoute);
app.use("/api/user", userRoute)

app.listen(3000,()=>{
    console.log('server is running on port 3000');
})
