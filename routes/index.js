/**
 * index.js
 * @description :: index route of platforms
 */

const express = require('express');
const router =  express.Router();
const rateLimit = require('express-rate-limit');

const rateLimiter = rateLimit({
  windowMs:30 * 60 * 1000,
  max:20,
  message:'Rate limit exceeded, please try again after 30 minutes',
  skip: (req) => {
    if (req.url.includes('/swagger') || req.url.includes('/favicon')) {
      return true;
    } else {
      return false;
    }
  }
});

router.use(rateLimiter,require('./admin/index'));  
router.use(rateLimiter,require('./device/v1/index'));  

module.exports = router;