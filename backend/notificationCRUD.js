const Notification = require('../config/mongoose/notification');
const AWS = require('aws-sdk');

AWS.config.update({
    region: process.env.AWS_SES_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

exports.getNotifications = (req,res) => {
  Notification.find((err, rows) => {
    if(err){
      console.log(err);
      return res.status(404).json({message: "An error occured"});
    }
    return res.status(200).json(rows);
  });
};

exports.createNotification = (req, res) => {
  const newNotification = new Notification({
    type: req.body.type,
    userId: req.body.userId,
    read: req.body.read
  });
  newNotification.save((err) => {
    if(err){
      console.log(err);
      return res.status(404).json({message: 'An error occured'});
    }
    return res.status(201).json(newNotification);
  });
};


exports.getNotificationById = (req,res) => {
  Notification.findById(req.params._id, (err,notification) =>{
    if(err){
      console.log(err);
      return res.status(404).json({message: 'An error occured'});
    }
    return res.status(200).json(notification);
  });
};

exports.updateNotification = (req,res)=>{
  Notification.updateOne({_id: req.params._id},
  {
    type: req.body.type,
    userId: req.body.userId,
    read: req.body.read
  }, (err, notification) =>{
    if(err){
      console.log(err);
      return res.status(404).json({message: 'An error occured'});
    }
    return res.status(202).json(notification);
  });
};

exports.deleteNotification = (req,res) => {
  Notification.deleteOne({_id: req.params._id}, (err, data) => {
    if(err){
      console.log(err);
      return res.status(404).json({message: 'An error occured'});
    }
    return res.status(200).json(data)
  });
};
