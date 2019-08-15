const Invite = require('../config/mongoose/invite');
const AWS = require('aws-sdk');

AWS.config.update({
    region: process.env.AWS_SES_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

exports.getInvites = (req,res) => {
  Invite.find( (err, rows) => {
    if(err){
      console.log(err);
      return res.status(404).json({message: "An error occured"});
    }
    return res.status(200).json(rows);
  });
};

exports.createInvite = (req,res) =>{
  let newInvite = new Invite({
    userId: req.body.userId,
    timestamp: req.body.timestamp,
    invitationEmail: req.body.invitationEmail,
    toggled: req.body.toggled
  });
  newInvite.save( (err) => {
    if(err){
      console.log(err);
      return res.status(404).json({message: "An error occured"});
    }
    return res.status(201).json(newInvite);
  });
};

exports.getInviteById = (req,res) =>{
  Invite.findById(req.params._id, (err, invite) =>{
    if(err){
      console.log(err);
      return res.status(404).json({message: 'An error occured'});
    }
    return res.status(200).json(invite);
  });
};

exports.updateInvite = (req,res) => {
  Invite.updateOne({_id:req.params._id},
  {
    userId: req.body.userId,
    timestamp: req.body.timestamp,
    invitationEmail: req.body.invitationEmail,
    toggled: req.body.toggled
  }, (err,invite) => {
    if(err){
      console.log(err);
      return res.status(404).json({message: 'An error occured'});
    }
    return res.status(202).json(invite);
  });
};

exports.deleteInvite = (req,res) => {
  Invite.deleteOne({_id:req.params._id}, (err,data) => {
    if(err){
      console.log(err);
      return res.status(404).json({message: 'An error occured'});
    }
    return res.status(200).json(data);
  });
};
