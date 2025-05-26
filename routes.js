const router=require('express').Router();
const { addBook, getBooks, updateBooks, deleteBook, getTotalStock } = require('./controllers/Bookcontroller');
const authMiddleware=require('./middleware/authMiddleware')




router.post('/POST/books',authMiddleware,addBook);
router.get('/GET/books',authMiddleware,getBooks);
router.put('/PUT/books',authMiddleware,updateBooks);
router.delete('/DELETE/books',authMiddleware,deleteBook);
router.get('/GETSTOCK/books',authMiddleware,getTotalStock);



module.exports=router;