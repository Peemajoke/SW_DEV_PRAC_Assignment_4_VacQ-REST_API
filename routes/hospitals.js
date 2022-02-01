const express = require('express');
// const { route } = require('express/lib/application');
// add this after controller is created
const {getHospitals, getHospital, createHospital, deleteHospital, updateHospital} = require('../controllers/hospitals');

const router=express.Router();

router.route('/').get(getHospitals).post(createHospital);
router.route('/:id').get(getHospital).put(updateHospital).delete(deleteHospital);

module.exports = router; //to let other file know the var router. router store all methods in this file since we use router.FunctionName()