var express = require('express');
var router = express.Router();

var appliedCRUD = require('../backend/appliedCRUD');

router.route('/')
  .get(appliedCRUD.getApplieds)
  .post(appliedCRUD.createApplied);

router.route('/:_id')
  .get(appliedCRUD.getAppliedById);


module.exports = router;
