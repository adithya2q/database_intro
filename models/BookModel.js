const express = require('express');
const mongoose=require('mongoose');

const productSchema=new mongoose.Schema({
   title:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    stockLeft:{
        type:Number,

    },
    isActive:{
        type:Boolean,
        default:true
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    // totalStocks:{
    //     type:Number,
    // },

},{
        timestamps:true
    }
);
const ProductModel=mongoose.model('books',productSchema);
module.exports=ProductModel;    