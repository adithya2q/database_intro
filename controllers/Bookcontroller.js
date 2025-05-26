const { response } = require("express");
const BookModel = require("../models/BookModel");

module.exports = {
    addBook:(req,res)=>{
        try{
            const {title, price,author,stockLeft}=req.body;
            if(title && price && author && stockLeft){
                const newbook=new BookModel({
                    title,
                    price,
                    author,
                    stockLeft
                });
                newbook.save()
                .then((data)=>{
                    console.log('response:',data);
                    res.status(200).json({
                        success:true,
                        statuscode:200,
                        message:'Book added successfully',
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
getBooks:async (req,res)=>{
    try{
        const {author,minPrice,maxPrice}=req.query;
         const query={isDeleted:false};
         if (author){
            query.author=author
         }
         if (minPrice && maxPrice){
            query.price={
                $gte:parseFloat(minPrice),
                $lte:parseFloat(maxPrice)
            }
         }
         else if (minPrice){
            query.price={
                $gte:parseFloat(minPrice)
            }
         }
         else if (maxPrice){
            query.price={
                $lte:parseFloat(maxPrice)
            }
         }
        const books=await BookModel.find(query).sort({price:-1});
        console.log('books:',books);
        if (books.length>0){
            return res.status(200).json({
                success:true,
                statuscode:200,
                count:books.length,
                message:'Products fetched successfully',
                data:books
            });
        }
        else{
            return res.status(200).json({
                success:true,
                statuscode:200,
                count:books.length,
                message:'No products found',
                data:[]
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
updateBooks: (req, res) => {
    try{
        const {bookId,updatedData}=req.body;
        if(bookId){
            BookModel.updateOne(
               { _id:bookId},
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
},
deleteBook: async (req, res) => {
    try {
        const { title } = req.body;

        if (title) {
            const response = await BookModel.deleteOne({ title: title });

            if (response.deletedCount > 0) {
                return res.status(200).json({
                    success: true,
                    statuscode: 200,
                    message: 'Product deleted successfully',
                    data: response
                });
            } else {
                return res.status(400).json({
                    success: false,
                    statuscode: 400,
                    message: 'Product not deleted',
                    data: response
                });
            }
        } else {
            return res.status(400).json({
                success: false,
                statuscode: 400,
                message: 'Title is required'
            });
        }

    } catch (err) {
        return res.status(500).json({
            success: false,
            statuscode: 500,
            message: 'Internal server error',
            error: err.message
        });
    }
},
getTotalStock: async (req, res) => {
  try {
    const result = await BookModel.aggregate([
      {
        $group: {
          _id: null,
          totalStock: { $sum: "$stockLeft" }
        }
      }
    ]);

    const totalStock = result[0]?.totalStock || 0;

    res.status(200).json({
      success: true,
      message: "Total stock counted successfully",
      totalStock: totalStock
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message
    });
  }
}
}