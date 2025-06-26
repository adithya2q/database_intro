const express = require('express');
const mongoose=require('mongoose');


const DistrictSchema=new mongoose.Schema({
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
    stateId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'States',
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


const DistrictModel=mongoose.model('Districts',DistrictSchema);
module.exports= DistrictModel;