const express = require('express');
const mongoose=require('mongoose');

const StateSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    population:{
        type:Number,
        required:true
    },
    area_in_sq_km:{
        type:Number,
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
},{
        timestamps:true
    }
);


const StateModel=mongoose.model('States',StateSchema);
module.exports= StateModel;