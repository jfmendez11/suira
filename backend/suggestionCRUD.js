const Suggestion = require('../config/mongoose/suggestion');
const AWS = require('aws-sdk');

AWS.config.update({
    region: process.env.AWS_SES_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

exports.getSuggestions = (req,res) => {
  Suggestion.find((err, rows) => {
    if(err){
      console.log(err);
      return res.status(404).json({message: "An error occured"});
    }
    return res.status(200).json(rows);
  });
};

exports.createSuggestion = (req,res) => {
  let newSuggestion = new Suggestion({
    userId: req.body.userId,
    text: req.body.text,
    rating: req.body.rating
  });
  newSuggestion.save((err) => {
    if(err){
      console.log(err);
      return res.status(404).json({message: "An error occured"});
    }
    return res.status(201).json(newSuggestion);
  });
};

exports.getSuggestionById = (req,res) => {
  Suggestion.findById(req.params._id, (err,suggestion) => {
    if(err){
      console.log(err);
      return res.status(404).json({message: "An error occured"});
    }
    return res.status(200).json(suggestion);
  });
};

exports.updateSuggestion = (req,res) =>{
  Suggestion.updateOne({_id: req.params._id},{
    userId: req.body.userId,
    text: req.body.text,
    rating: req.body.rating
  }, (err, suggestion) => {
    if(err){
      console.log(err);
      return res.status(404).json({message: "An error occured"});
    }
    return res.status(202).json(suggestion);
  });
};

exports.deleteSuggestion = (req,res) => {
  Suggestion.deleteOne({_id: req.params._id}, (err, data) => {
    if(err){
      console.log(err);
      return res.status(404).json({message: 'An error occured'});
    }
    return res.status(200).json(data)
  });
};
