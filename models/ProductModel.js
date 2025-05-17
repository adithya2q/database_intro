const express = require('express');
const mongoose=require('mongoose');

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    size:{
        type:String,
        enum:['S','M','L','XL'],
        required:true
    },
    isActive:{
        type:Boolean,
        default:true
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    totalStocks:{
        type:Number,
    },
    stockLeft:{
        type:Number,

    }
},{
        timestamps:true
    }
);
const ProductModel=mongoose.model('Product',productSchema);
module.exports=ProductModel;    