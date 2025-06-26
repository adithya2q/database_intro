const StateModel= require("../models/StateModel");
const DistrictModel= require("../models/DistrictModel");

module.exports = {
    addstate:(req,res)=>{
        try{
            const {name,population,area_in_sq_km}=req.body;
            if(name && population && area_in_sq_km){
                const newstate=new StateModel({
                    name,
                    population,
                    area_in_sq_km
                });
                newstate.save()
                .then((data)=>{
                    console.log('response:',data);
                    res.status(200).json({
                        success:true,
                        statuscode:200,
                        message:'State added successfully',
                        data:data
                    });
                })
                .catch((err)=>{
                    res.status(500).json({
                        success:false,
                        statuscode:500,
                        message:'Internal server error ;State not added',
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
    addDistrict:(req,res)=>{
        try{
            const {name,population,area_in_sq_km,stateId}=req.body;
            if(name && population && area_in_sq_km &&stateId){
                const newdistrict=new DistrictModel({
                    name,
                    population,
                    area_in_sq_km,
                    stateId
                });
                newdistrict.save()
                .then(async(data)=>{
                    console.log('response:',data);

                    try{
                        await StateModel.updateOne(
                            {_id:stateId},
                            {$inc:{
                                population:data.population,
                                area_in_sq_km:data.area_in_sq_km
                            }}
                        )
                    
                    res.status(200).json({
                        success:true,
                        statuscode:200,
                        message:'District added successfully and state updated',
                        data:data
                    });
                }
                catch(updateErr){
                    res.status(500).json({
                        success:false,
                        statuscode:500,
                        message:'District saved but state update failed',
                        error:updateErr.message
                    })
                }
                })
                .catch((err)=>{
                    res.status(500).json({
                        success:false,
                        statuscode:500,
                        message:'Internal server error ;District not added',
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
getStatePopulation:async (req,res)=>{
    try{
        const statename=req.params.name;
        const state=await StateModel.findOne({name:statename}).select('name population');
        if (state){
            return res.status(200).json({
                success:true,
                statuscode:200,
                state:state.name,
                population:state.population,
                message:'State population fetched successfully'
            })
        }
        else{
            return res.status(404).json({
                success:false,
                statuscode:404,
                message:'State not found'
            });
        }

    }
    catch(err){
        return res.status(500).json({
            success:false,
            statuscode:500,
            message:'Internal server error',
            error:err.message
        })
    }
},
updateDistrictPopulation:async(req,res)=>{
    try{
        const districtname=req.params.name;
        const district=await DistrictModel.findOne({name:districtname});
        if(district){
            const updatedPopulation = req.body.population;
            if(updatedPopulation){
                district.population=updatedPopulation;
                await district.save();
                return res.status(200).json({
                    success:true,
                    statuscode:200,
                    message:'District population updated successfully',
                    data:district
                })
            }
            else{
                return res.status(400).json({
                    success:false,
                    statuscode:400,
                    message:'Population value is required'
                })
            }
            }
            else{
                return res.status(404).json({
                    success:false,
                    statuscode:404,
                    message:'District not found'
                });
            }}
            catch(err){
        return res.status(500).json({
            success:false,
            statuscode:500,
            message:'Internal server error',
            error:err.message
        })
        }
    },
deleteDistrict:async (req,res)=>{
    try{
        const districtname=req.params.name;
        const district=await DistrictModel.findOneAndDelete({name:districtname, isDeleted:false});
        if(district){
            await StateModel.updateOne(
                {_id:district.stateId},
                {$inc:{
                    population:-district.population,
                    area_in_sq_km:-district.area_in_sq_km
                }}
            );
            return res.status(200).json({
                success:true,
                statuscode:200,
                message:'District deleted successfully and state updated',
                data:district
            });
        }
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
getStateTotalpopulation:async (req,res)=>{
    try{
        const states=await StateModel.aggregate
        ([{ $match: { isDeleted: false } },
            {
                $group: {
                    _id: null,
                    totalPopulation: { $sum: "$population" }
                }
            }
        ]);
            if(states.length > 0){
                return res.status(200).json({
                    success:true,
                    statuscode:200,
                    totalPopulation: states[0].totalPopulation,
                    message:'Total population fetched successfully'
                });
            } else {
                return res.status(404).json({
                    success:false,
                    statuscode:404,
                    message:'No states found'
                });
            }
        
    }
    catch(err){
        return res.status(500).json({
            success:false,
            statuscode:500,
            message:'Internal server error',
            error:err.message
        })
    }
},
groupByState:async(req,res)=>{
    try{
    const result=await DistrictModel.aggregate([
        {$match:{isDeleted:false}},
        {
            $group: {
                _id:'$stateId',
                totalPopulation:{$sum:'$population'}
            }},
            {
                $sort:{totalPopulation:-1}
            }
    ])
    if(result.length>0){
        return res.status(200).json({
            success:true,
            statuscode:200,
            message:'Districts grouped by state succesfully',
            data:result
        })
    }}
    catch(err){
        return res.status(500).json({
            success:false,
            statuscode:500,
            message:'Intenal server error',
            error:err.message
        })
    }
},
joinDistrictsAndStates:async(req,res)=>{
    try{
    const result=await DistrictModel.aggregate([
        {
            $lookup:{
                from:'states',
                localField:'stateId',
                foreignField:'_id',
                as:'stateDetails'
            }
        }
    ])
    res.status(200).json({
        success:true,
        statuscode:200,
        message:'Districts and states joined successfully',
        data:result
    })}
    catch(err){
        return res.status(500).json({
            success:false,
            statuscode:500,
            message:'Internal server error',
            error:err.message
        })
    }
},
getAverageDensity:async(req,res)=>{
  try{
    const result=await StateModel.aggregate([
        {
        $match:{isDeleted:false}
    },
    {
        $group:{
            _id:"$_id",
            totalpopulation:{$sum:"$population"},
            totalarea:{$sum:"$area_in_sq_km"}
        }
    },
    {
        $project:{
            _id:1,
            totalpopulation:1, 
            totalarea:1,
            populationdensity:{
            $cond:[
                {$eq:["$totalarea",0]},
                0,
                {$divide:["$totalpopulation","$totalarea"]}
            ]}
        }
    }
    ])
    return res.status(200).json({
        success:true,
        statuscode:200,
        message:'Population density fetched successfully',
        data:result
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
getDistricts:async(req,res)=>{
    try{
        const districts=await DistrictModel.find({isDeleted:false})
        return res.status(200).json({
            success:true,
            statuscode:200,
            count:districts.length,
            message:'Districts fetched successfully',
            data:districts
        })
    }
    catch{
        return res.status(500).json({
            success:false,
            statuscode:500,
            message:'Internal server error',
            error:err.message
        })
    }
},
getStates:async(req,res)=>{
    try{
        const states=await StateModel.find({isDeleted:false});
        return res.status(200).json({
            success:true,
            statuscode:200,
            message:"states fetched successfully",
            data:states
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            statuscode:500,
            message:'Internal server error',
            error:err.message
        })
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