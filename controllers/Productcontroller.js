 const customers=[
    {
        'id':1,
        "name":'Customer 1',
        "email":"customer1@mail.com",
        "location":'Thiruvananthapuram',
    },
    {'id':2,
        "name":'Customer 2',
        "email":"customer2@mail.com",
        "location":'Kollam',
    },
    {
        'id':3,
        "name":'Customer 3',
        "email":"customer3@mail.com",
        "location":'Pathanamthitta',
    },
    {
        'id':4,
        "name":'Customer 4',
        "email":"customer4@mail.com",
        "location":'Alappuzha',
    },
    {
        'id':5,
        "name":'Customer 5',
        "email":"customer6@mail.com",
        "location":'Kottayam',

    }
 ];

 module.exports={
    addCustomers:(req,res)=>{

        try{
            console.log("api call:",req?.body);
                customers.push(req.body);
    
                res.status(200).json({
                    success:true,
                    statuscode:200,
                    message:'Product added successfully',
                    data: req.body
                }); 
        }
        catch(e){
                res.status(500).json({
                    success:false,
                    statuscode:500,
                    message:'Internal Server Error',
                    error:e.message
                });
        }

    },
    getCustomers:(req, res)=>{
        try{
            const {search,page,limit}=req.query;
            const startIndex=(page-1)*limit;
            const endIndex=startIndex+parseInt(limit);
            if (search){
                const filteredCustomers=customers.filter((customer)=>
                customer.name.toLowerCase().includes(search.toLowerCase())||
                customer.email.toLowerCase().includes(search.toLowerCase()) ||
                customer.location.toLowerCase().includes(search.toLowerCase()));

                if(filteredCustomers.length===0){
                    return res.status(200).json({
                        success:true,
                        statuscode:200,
                        message:'No products found',
                        data:[]
                    });
                }
                else if(filteredCustomers.length>0){
                    if (page,limit){
                        const paginatedCustomers=filteredCustomers.slice(startIndex,endIndex);
                    return res.status(200).json({
                    success:true,
                    statuscode:200,
                    message:'Products fetched successfully',
                    totalcount: filteredCustomers.length,
                    currentPage: parseInt(page),
                    totalPages: Math.ceil(filteredCustomers.length / limit),
                    data: paginatedCustomers
                    
                });
            }
            else {
                return res.status(200).json({
                    success:true,
                    statuscode:200,
                    message:'Products fetched successfully',
                    totalcount: filteredCustomers.length,
                    data: filteredCustomers
                });
            }
            }
            }
            else{ 
                if (page,limit){
                    
                    const resultCustomers=customers.slice(startIndex,endIndex);
                    return res.status(200).json({
                    success:true,
                    statuscode:200,
                    message:'Products fetched successfully',
                    totalcount: customers.length,
                    currentPage: parseInt(page),
                    totalPages: Math.ceil(customers.length / limit),
                    data: resultCustomers
                });
                }
                else{
                    return res.status(200).json({
                        success:true,
                        statuscode:200,
                        message:'Products fetched successfully',
                        data: customers
                    });
                }
        }
        }
        catch(e){
            res.status(500).json({
                success:false,
                statuscode:500,
                message:'Internal Server Error',
                error:e.message
            });
        }
    },
    updateCustomer:(req,res)=>{
        try{
            console.log("reqBody:",req.body);
            const customerIndex=customers.findIndex((customer)=>customer.id===req.body.id);
            if(customerIndex===-1){
                return res.status(200).json({   
                    success:false,
                    statuscode:404,
                    message:'Product not found',
                })
            }
            else{
                customers[customerIndex]=req.body.updatedData;
                res.status(200).json({
                    success:true,
                    statuscode:200,
                    message:'Product updated successfully',
                    data: customers[customerIndex]
                });
            };
        }
        catch(e){
            res.status(500).json({
                success:false,
                statuscode:500,
                message:'Internal Server Error',
                error:e.message
            });
        }
    },
    deleteCustomer:(req,res)=>{
        try{
            const customerIndex=customers.findIndex((customer)=>customer.id===req.body.id);
            if(customerIndex===-1){
                return res.status(200).json({   
                    success:false,
                    statuscode:404,
                    message:'Product not found',
                })
            }
            else{
                customers.splice(customerIndex,1);
                res.status(200).json({
                    success:true,
                    statuscode:200,
                    message:'Product deleted successfully',
                });
            };
        }
        catch(e){
            res.status(500).json({
                success:false,
                statuscode:500,
                message:'Internal Server Error',
                error:e.message
            });
        }
    }
}