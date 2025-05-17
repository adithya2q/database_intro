const ProductModel = require("../models/ProductModel");

module.exports = {
    addProduct:(req,res)=>{
        try{
            const {name, price,size}=req.body;
            if(name && price && size){
                const newproduct=new ProductModel({
                    name,
                    price,
                    size
                });
                newproduct.save()
                .then((data)=>{
                    console.log('response:',data);
                    res.status(200).json({
                        success:true,
                        statuscode:200,
                        message:'Product added successfully',
                        data:data
                    });
                })
                .catch((err)=>{
                    res.status(500).json({
                        success:false,
                        statuscode:500,
                        message:'Internal server error ;Product not added',
                        error:err.message
                        
                    });
                });
            }
            else{
                res.status(200).json({
                    success:false,
                    statuscode:400,
                    message:'Missing required fields',
                });
            }

        }
        catch(err){
            res.status(500).json({
                success:false,
                statuscode:500,
                message:'Internal server error try not worked',
                error:err.message
            });
        }
},
getProducts:async (req,res)=>{
    try{
        const products=await ProductModel.find({isDeleted:false})
        return res.status(200).json({
            success:true,
            statuscode:200,
            count:products.length,
            message:'Products fetched successfully',
            data:products
        });
    }
    catch(err){
        return res.status(500).json({
            success:false,
            statuscode:500,
            message:'Internal server error',
            error:err.message
        });
    }
},
updateProducts: (req, res) => {
    try{
        const {productId,updatedData}=req.body;
        if(productId){
            ProductModel.updateOne(
               { _id:productId},
                updatedData
            ).then((response)=>{
                console.log('response:',response);
                res.status(200).json({
                    success:true,
                    statuscode:200,
                    message:'Product updated successfully',
                    data:response
                });
            })
        }
    }
    catch(err){
        res.status(500).json({
            success:false,
            statuscode:500,
            message:'Update failed',
            error:err.message
        });
    }
}
}