var express = require('express');
var router = express.Router();

var inviteCRUD = require('../backend/inviteCRUD');

router.route('/')
  .get(inviteCRUD.getInvites)
  .post(inviteCRUD.createInvite);

router.route('/:_id')
  .get(inviteCRUD.getInviteById)
  .put(inviteCRUD.updateInvite)
  .delete(inviteCRUD.deleteInvite);


module.exports = router;
