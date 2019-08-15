const UserAccess = require('../config/mongoose/userAccess');
const AWS = require('aws-sdk');

AWS.config.update({
    region: process.env.AWS_SES_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

exports.getUserAccesses = (req, res) => {
    UserAccess.find((err, rows) => {
    if(err){
      console.log(err);
      return res.status(404).json({message: "An error occured"});
    }
    return res.status(200).json(rows);
  });
};

exports.createUserAccess = (req, res) => {
  const newUserAccess = new UserAccess({
    userId: req.body.userId,
    medium: req.body.medium,
    timestamp: `${new Date().getDate()}/${new Date().getMonth()}/${new Date.getFullYear()} ${new Date().getHours()}:${new Date().getMinutes()}`
  });
  newUserAccess.save((err) => {
    if(err){
      console.log(err);
      return res.status(404).json({message: 'An error occured'});
    }
    return res.status(202).json(newUserAccess);
  });
};

exports.getUserAccessById = (req,res) => {
    UserAccess.findById(req.params.userAccessId, (err,userAccess) =>{
    if(err){
      console.log(err);
      return res.status(404).json({message: 'An error occured'});
    }
    return res.status(200).json(userAccess);
  })
};

exports.updateUserAccess = (req, res, user) => {
    UserAccess.updateOne({_id: req.params.userAccessId},
        {
            userId: req.body.userId,
            medium: req.body.medium,
        },
        (err, userAccess) => {
            if (err) {
                console.log(err);
                return res.status(404).json({message: 'An error occured'});
            }
            return res.status(200).json(userAccess);
        }
    );
};

exports.deleteUserAccess = (req, res, user) => {
    UserAccess.deleteOne({_id: req.params.userAccessId}, (err, data) => {
        if (err) {
            onsole.log(err);
            return res.status(404).json({message: 'An error occured'});
        }
        return res.status(200).json(data);
    });
};