const { response } = require('express');
const mongoose= require('mongoose');
const mongodburiString=process.env.MONGODB_URI_STRING;

mongoose.connect(mongodburiString)
.then((response)=>{
    console.log("Population_Database connected successfully");
}).catch((error)=>{
    console.log("Error connecting to MongoDB",error);
});
