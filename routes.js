const { addProduct, getProducts, updateProducts } = require('./controllers/Productcontroller');

const router=require('express').Router();
const authMiddleware=require('./middleware/authMiddleware');
// const {addCustomers, getCustomers, updateCustomer, deleteCustomer}=require('./controllers/userController');

router.post('/POST/products',authMiddleware,addProduct);
router.get('/GET/products',authMiddleware,getProducts);
// router.get('/GET/customers',authMiddleware,getCustomers);
router.put('/PUT/products',authMiddleware,updateProducts);
// router.delete('/DELETE/customers',authMiddleware,deleteCustomer);



module.exports=router;