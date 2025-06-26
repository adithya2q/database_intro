

const router=require('express').Router();
const { addstate, addDistrict, getStatePopulation, updateDistrictPopulation, deleteDistrict, getStateTotalpopulation, groupByState, joinDistrictsAndStates, getAverageDensity, getDistricts, getStates } = require('./controllers/Statisticscontroller');
const authMiddleware=require('./middleware/authMiddleware');
// const {addCustomers, getCustomers, updateCustomer, deleteCustomer}=require('./controllers/userController');

router.post('/POST/api/states',authMiddleware,addstate);
router.post('/POST/api/districts',authMiddleware,addDistrict);
router.get('/GET/api/states',authMiddleware,getStates);
router.get('/GET/api/districts',authMiddleware,getDistricts);
router.get('/GET/api/states/:name/population',authMiddleware,getStatePopulation);
router.get('/GET/api/states/total-population',authMiddleware,getStateTotalpopulation);
router.get('/GET/api/districts/group-by-state',authMiddleware,groupByState);
router.get('/GET/api/districts/with-states',authMiddleware,joinDistrictsAndStates);
router.get('/GET/api/states/average-density',authMiddleware,getAverageDensity);
router.put('/PUT/api/districts/:name/population',authMiddleware,updateDistrictPopulation);
router.delete('/DELETE/api/districts/:name',authMiddleware,deleteDistrict);



// router.get('/GET/products',authMiddleware,getProducts);
// router.get('/GET/customers',authMiddleware,getCustomers);
// router.put('/PUT/products',authMiddleware,updateProducts);
// router.delete('/DELETE/customers',authMiddleware,deleteCustomer);



module.exports=router;