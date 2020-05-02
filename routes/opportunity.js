var express = require('express');
var router = express.Router();

var opportunitiesCRUD = require('../backend/opportunitiesCRUD');

router.route('/')
  .get(opportunitiesCRUD.getOpportunities)
  .post(opportunitiesCRUD.createOpportunity);

router.route('/:oppId')
  .get(opportunitiesCRUD.getOpportunityById)
  .put(opportunitiesCRUD.updateOpportunity)
  .delete(opportunitiesCRUD.deleteOpportunity);

router.route('/:ind')
  .get(opportunitiesCRUD.getOpportunityByIndustry);

module.exports = router;
