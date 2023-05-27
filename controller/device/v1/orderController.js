/**
 * orderController.js
 * @description : exports action methods for order.
 */

const Order = require('../../../model/order');
const orderSchemaKey = require('../../../utils/validation/orderValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../../utils/common');
   
/**
 * @description : create document of Order in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Order. {status, message, data}
 */ 
const addOrder = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      orderSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Order(dataToCreate);
    let createdOrder = await dbService.create(Order,dataToCreate);
    return res.success({ data : createdOrder });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : find all documents of Order from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Order(s). {status, message, data}
 */
const findAllOrder = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      orderSchemaKey.findFilterKeys,
      Order.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Order, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundOrders = await dbService.paginate( Order,query,options);
    if (!foundOrders || !foundOrders.data || !foundOrders.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundOrders });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Order from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Order. {status, message, data}
 */
const getOrder = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundOrder = await dbService.findOne(Order,query, options);
    if (!foundOrder){
      return res.recordNotFound();
    }
    return res.success({ data :foundOrder });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Order.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getOrderCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      orderSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedOrder = await dbService.count(Order,where);
    return res.success({ data : { count: countedOrder } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Order with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Order.
 * @return {Object} : updated Order. {status, message, data}
 */
const updateOrder = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      orderSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedOrder = await dbService.updateOne(Order,query,dataToUpdate);
    if (!updatedOrder){
      return res.recordNotFound();
    }
    return res.success({ data :updatedOrder });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : partially update document of Order with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Order.
 * @return {obj} : updated Order. {status, message, data}
 */
const partialUpdateOrder = async (req,res) => {
  try {
    if (!req.params.id){
      res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    delete req.body['addedBy'];
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      orderSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedOrder = await dbService.updateOne(Order, query, dataToUpdate);
    if (!updatedOrder) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedOrder });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

module.exports = {
  addOrder,
  findAllOrder,
  getOrder,
  getOrderCount,
  updateOrder,
  partialUpdateOrder    
};