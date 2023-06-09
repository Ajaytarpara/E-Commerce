/**
 * orderRoutes.js
 * @description :: CRUD API routes for order
 */

const express = require('express');
const router = express.Router();
const orderController = require('../../../controller/device/v1/orderController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/order/create').post(auth(PLATFORM.DEVICE),checkRolePermission,orderController.addOrder);
router.route('/device/api/v1/order/list').post(auth(PLATFORM.DEVICE),checkRolePermission,orderController.findAllOrder);
router.route('/device/api/v1/order/count').post(auth(PLATFORM.DEVICE),checkRolePermission,orderController.getOrderCount);
router.route('/device/api/v1/order/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,orderController.getOrder);
router.route('/device/api/v1/order/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,orderController.updateOrder);    
router.route('/device/api/v1/order/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,orderController.partialUpdateOrder);

module.exports = router;
