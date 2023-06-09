/**
 * MasterController.js
 * @description : exports action methods for Master.
 */

const Master = require('../../../model/Master');
const MasterSchemaKey = require('../../../utils/validation/MasterValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const deleteDependentService = require('../../../utils/deleteDependent');
const utils = require('../../../utils/common');

module.exports = {};