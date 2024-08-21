const express = require('express')
const dbConnect = require('./DB')
const userRoute = require('./Router/userRoute')

const app = express();

app.listen(3000,()=>{
    console.log('server is running on port 3000');
})
dbConnect();
app.use("/api/user",userRoute);