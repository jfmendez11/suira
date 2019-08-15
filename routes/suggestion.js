var express = require('express');
var router = express.Router();

var suggestionCRUD = require('../backend/suggestionCRUD');

router.route('/')
  .get(suggestionCRUD.getSuggestions)
  .post(suggestionCRUD.createSuggestion);

router.route('/:_id')
  .get(suggestionCRUD.getSuggestionById)
  .put(suggestionCRUD.updateSuggestion)
  .delete(suggestionCRUD.deleteSuggestion);

module.exports = router;
