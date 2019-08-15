const Rating= require('../config/mongoose/rating');
const AWS = require('aws-sdk');

AWS.config.update({
    region: process.env.AWS_SES_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

exports.getRatings = (req,res) => {
  Rating.find((err, rows) => {
    if(err){
      console.log(err);
      return res.status(404).json({message: "An error occured"});
    }
    return res.status(200).json(rows);
  });
};

exports.createRating = (req,res) => {
  const newRating = new Rating ({
    title: req.body.title,
    rating: req.body.rating,
    description: req.body.description,
    timestamp: req.body.timestamp
  });
  newRating.save((err) => {
    if(err){
      console.log(err);
      return res.status(404).json({message: "An error occured"});
    }
    return res.status(201).json(newRating);
  });
};

exports.getRatingById = (req,res) =>{
  Rating.findById(req.params._id, (err,rating) => {
    if(err){
      console.log(err);
      return res.status(404).json({message: "An error occured"});
    }
    return res.status(200).json(rating);
  });
};

exports.updateRating = (req,res) => {
  Rating.updateOne({_id: req.params._id},
  {
    title: req.body.title,
    rating: req.body.rating,
    description: req.body.description,
    timestamp: req.body.timestamp
  }, (err, rating) => {
    if(err){
      console.log(err);
      return res.status(404).json({message: "An error occured"});
    }
    return res.status(202).json(rating);
  });
};

exports.deleteRating = (req, res) =>{
  Rating.deleteOne({_id: req.params._id}, (err, data) => {
    if(err){
      console.log(err);
      return res.status(404).json({message: "An error occured"});
    }
    return res.status(200).json(data);
  });
};
