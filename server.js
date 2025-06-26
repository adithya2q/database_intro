const express=require('express');
const router=require('./routes');
const app=express();
require('dotenv').config();
dbconfig=require('./dbconfig/index.js');   

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/',router);

const PORT=process.env.PORT;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
}
);
