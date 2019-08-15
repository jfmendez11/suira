const OppAccess = require('../config/mongoose/oppAccess');
const AWS = require('aws-sdk');

AWS.config.update({
    region: process.env.AWS_SES_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

exports.getOppAccesses = (req, res) => {
    OppAccess.find((err, rows) => {
    if(err){
      console.log(err);
      return res.status(404).json({message: "An error occured"});
    }
    return res.status(200).json(rows);
  });
};

exports.createOppAccess = (req, res) => {
  const newOppAccess = new OppAccess({
    userId: req.body.userId,
    oppId: req.body.opportunityId,
    medium: req.body.medium,
    timestamp: `${new Date().getDate()}/${new Date().getMonth()}/${new Date.getFullYear()} ${new Date().getHours()}:${new Date().getMinutes()}`
  });
  newOppAccess.save((err) => {
    if(err){
      console.log(err);
      return res.status(404).json({message: 'An error occured'});
    }
    return res.status(202).json(newOppAccess);
  });
};

exports.getOppAccessById = (req,res) => {
    OppAccess.findById(req.params.oppAccessId, (err,oppAccess) =>{
    if(err){
      console.log(err);
      return res.status(404).json({message: 'An error occured'});
    }
    return res.status(200).json(oppAccess);
  })
};

exports.updateOppAccess = (req, res, user) => {
    OppAccess.updateOne({_id: req.params.oppAccessId},
        {
            userId: req.body.userId,
            oppId: req.body.opportunityId,
            medium: req.body.medium,
        },
        (err, oppAccess) => {
            if (err) {
                console.log(err);
                return res.status(404).json({message: 'An error occured'});
            }
            return res.status(200).json(oppAccess);
        }
    );
};

exports.deleteOppAccess = (req, res, user) => {
    OppAccess.deleteOne({_id: req.params.oppAccessId}, (err, data) => {
        if (err) {
            onsole.log(err);
            return res.status(404).json({message: 'An error occured'});
        }
        return res.status(200).json(data);
    });
};