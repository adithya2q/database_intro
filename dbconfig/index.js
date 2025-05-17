const { response } = require('express');
const mongoose= require('mongoose');
const mongodburiString=process.env.MONGODB_URI_STRING;

mongoose.connect(mongodburiString)
.then((response)=>{
    console.log("database_intro connected successfully");
}).catch((error)=>{
    console.log("Error connecting to MongoDB",error);
});
