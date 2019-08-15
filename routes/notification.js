var express = require('express');
var router = express.Router();

var notificationCRUD = require('../backend/notificationCRUD');

router.route('/')
  .get(notificationCRUD.getNotifications)
  .post(notificationCRUD.createNotification);

router.route('/:_id')
  .get(notificationCRUD.getNotificationById)
  .put(notificationCRUD.updateNotification)
  .delete(notificationCRUD.deleteNotification);

module.exports = router;
