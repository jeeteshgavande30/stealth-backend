const express = require('express');
const app = express();
const cors = require("cors");
const mongoose = require('mongoose');
require('dotenv').config();
const bookRoutes = require("./routes/books")

// Middlewares
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({origin:'*',credentials:true}));


app.get('/', (req,res)=>{
    res.send("Welcome to the universe!!!")
})

app.use(bookRoutes)


mongoose.connect(process.env.MONGO_URL)
.then(res=>{
    console.log("connected on port : 8080");
    app.listen(8080);
})
.catch(err=>{
    console.log(err);
})