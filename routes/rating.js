var express = require('express');
var router = express.Router();

var ratingCRUD = require('../backend/ratingCRUD');
router.route('/')
  .get(ratingCRUD.getRatings)
  .post(ratingCRUD.createRating);

router.route('/:_id')
  .get(ratingCRUD.getRatingById)
  .put(ratingCRUD.updateRating)
  .delete(ratingCRUD.deleteRating);

module.exports = router;
