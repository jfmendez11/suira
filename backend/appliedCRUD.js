const Applied = require('../config/mongoose/applied');
const AWS = require('aws-sdk');

AWS.config.update({
    region: process.env.AWS_SES_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

exports.getApplieds = (req, res) => {
  Applied.find((err, rows) => {
    if(err){
      console.log(err);
      return res.status(404).json({message: "An error occured"});
    }
    return res.status(200).json(rows);
  });
};

exports.createApplied = (req, res) => {
  const newApplied = new Applied({
    userId: req.body.userId,
    opportunityId: req.body.opportunityId,
    ratingId: req.body.ratingId,
    selected: req.body.selected,
    timestamp: req.body.timestamp
  });
  newApplied.save((err) => {
    if(err){
      console.log(err);
      return res.status(404).json({message: 'An error occured'});
    }
    return res.status(202).json(newApplied);
  });
};

exports.getAppliedById = (req,res) => {
  Applied.findById(req.params._id, (err,applied) =>{
    if(err){
      console.log(err);
      return res.status(404).json({message: 'An error occured'});
    }
    return res.status(200).json(applied);
  })
}
