const express = require('express');
// const { route } = require('express/lib/application');
// add this after controller is created
const {getHospitals, getHospital, createHospital, deleteHospital, updateHospital} = require('../controllers/hospitals');

//include other resources routers
const appointmentRouter=require('./appointments');

const router=express.Router();

const {protect, authorize} = require('../middleware/auth');

//Re-route into other resource routers
router.use('/:hospitalId/appointments/', appointmentRouter);

router.route('/').get(getHospitals).post(protect, authorize("admin"), createHospital);
router.route('/:id').get(getHospital).put(protect, authorize("admin"), updateHospital).delete(protect, authorize("admin"), deleteHospital);

module.exports = router; //to let other file know the var router. router store all methods in this file since we use router.FunctionName()