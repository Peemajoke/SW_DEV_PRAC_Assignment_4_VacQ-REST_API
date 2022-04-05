const express = require('express');
// const { route } = require('express/lib/application');
// add this after controller is created
const {getHospitals, getHospital, createHospital, deleteHospital, updateHospital, getVacCenters} = require('../controllers/hospitals');

//include other resources routers
const appointmentRouter=require('./appointments');

const router=express.Router();

const {protect, authorize} = require('../middleware/auth');
const { route } = require('./appointments');

//for swagger
/**
 * @swagger
 * components:
 *      schemas:
 *          Hospitals:
 *              type: object
 *              required:
 *              - name
 *              - address
 *              properties:
 *                  id:
 *                      type: string
 *                      format: uuid
 *                      description: The auto-generated is of the hospital
 *                      example: d290f1ee-6c54-4b01-90e6-d701748f0851
 *                  ลำดับ:
 *                      type: string
 *                      description: Ordinal number
 *                  name:
 *                      type: string
 *                      description: Hospital name
 *                  address:
 *                      type: string
 *                      description: House No., Street, Road
 *                  district:
 *                      type: string
 *                      description: Distinct
 *                  province:
 *                      type: string
 *                      description: province
 *                  postalcode:
 *                      type: string
 *                      description: 5-digit postal code
 *                  tel:
 *                      type: string
 *                      description: telepgone number
 *                  region:
 *                      type: string
 *                      description: region
 *              example:
 *                  id: 609bda561452242d88d36e37
 *                  ลำดับ: 121
 *                  name: Happy Hospital
 *                  address: 121 ถ.สุขุมวิทย์
 *                  district: บางนา
 *                  province: กรุงเทพมหานคร
 *                  postalcode: 10110
 *                  tel: 02-218-7000
 *                  region: กรุงเทพมหานคร(Bangkok)
 */

/**
 * @swagger
 * tags:
 *      name: Hospitals
 *      description: The hospitals managing API
 */

/**
 * @swagger
 *  /hospitals:
 *      get:
 *          summary: Returns the list of all the hospitals
 *          tags: [Hospitals]
 *          responses:
 *              200:
 *                  description: The list of the hospitals
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Hospitals'
 */

/**
 * @swagger
 *  /hospitals/{id}:
 *      get:
 *          summary: Get the hospital by id
 *          tags: [Hospitals]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                  type: string
 *                require: true
 *                description: The hospital id
 *          responses:
 *              200:
 *                  description: The hospital description by id
 *                  content:
 *                      application/json:
 *                          schema:
 *                              items:
 *                                  $ref: '#/components/schemas/Hospitals'
 *              404:
 *                  description: The hospital was not found
 */

/**
 * @swagger
 *  /hospitals:
 *      post:
 *          summary: Create a new hospital
 *          tags: [Hospitals]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Hospitals'
 *          responses:
 *              201:
 *                  description: The hospital was successfully created
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Hospitals'
 *              500:
 *                  description: Some server errors
 */

/**
 * @swagger
 *  /hospitals/{id}:
 *      put:
 *          summary: Update the hospital by id
 *          tags: [Hospitals]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                  type: string
 *                require: true
 *                description: The hospital id
 *          requesteBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref '#/components/schemas/Hospitals'
 *          responses:
 *              200:
 *                  description: The hospital was updated
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Hospitals'
 *              404:
 *                  description: The hospital was not found
 *              500:
 *                  description: Some error happened
 */

/**
 * @swagger
 *  /hospitals/{id}:
 *      delete:
 *          summary: Remove the hospital by id
 *          tags: [Hospitals]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                  type: string
 *                require: true
 *                description: The hospital id
 *          responses:
 *              200:
 *                  description: The hospital was deleted
 *              404:
 *                  description: The hospital was not found
 */

//Re-route into other resource routers
router.use('/:hospitalId/appointments/', appointmentRouter);

router.route('/vacCenters').get(getVacCenters);

router.route('/').get(getHospitals).post(protect, authorize("admin"), createHospital);
router.route('/:id').get(getHospital).put(protect, authorize("admin"), updateHospital).delete(protect, authorize("admin"), deleteHospital);

module.exports = router; //to let other file know the var router. router store all methods in this file since we use router.FunctionName()