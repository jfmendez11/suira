const Opportunity = require('../config/mongoose/opportunities');
const AWS = require('aws-sdk');

AWS.config.update({
    region: process.env.AWS_SES_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

exports.getOpportunities = (req, res) => {
    Opportunity.find((err, rows) => {
        if (err) {
            console.log(err);
            return res.status(404).json({message: 'An error occured'});
        }
        return res.status(200).json(rows);
    });
};

exports.getOpportunityById = (req, res) => {
    Opportunity.findById(req.params._id, (err, opp) => {
        if (err) {
            console.log(err);
            return res.status(404).json({message: 'An error occured'});
        }
        return res.status(200).json(opp);
    });
};

exports.getOpportunityByIndustry = (req, res) => {
    //Have to check how to do query correctly
    Opportunity.find({$or: [{ind1: req.params.ind}, 
                            {ind2: req.params.ind}, 
                            {ind3: req.params.ind}, 
                            {ind4: req.params.ind}, 
                            {ind5: req.params.ind}]}, (err, rows) => {
        if (err) {
            console.log(err);
            return res.status(404).json({message: 'An error occured'});
        }
        return res.status(200).json(rows);
    });
};

exports.createOpportunity = (req, res, user) => {
    const newOpp = new Opportunity({
        userId: user._id,
        postDate: `${new Date().getDate()}/${new Date().getMonth()}/${new Date.getFullYear()} ${new Date().getHours()}:${new Date().getMinutes()}`,
        title: req.body.title,
        description: req.body.description,
        ind1: req.body.ind1,
        ind2: req.body.ind2 ? req.body.ind2 : null,
        ind3: req.body.ind3 ? req.body.ind3 : null,
        ind4: req.body.ind4 ? req.body.ind4 : null,
        ind5: req.body.ind5 ? req.body.ind5 : null,
        location: req.body.location ? req.body.location : null,
        payment: req.body.payment ? req.body.payment : null,
        startDate: req.body.startDate ? req.body.startDate : null,
        endDate: req.body.endDate ? req.body.endDate : null,
    });
    newOpp.save((err) => {
        if (err) {
            console.log(err);
            return res.status(404).json({message: 'An error occured'});
        }
        return res.status(200).json(newOpp);
    });
};

exports.updateOpportunity = (req, res, user) => {
    Opportunity.updateOne({userId: user._id, _id: req.params.oppId},
        {
            title: req.body.title,
            description: req.body.description,
            ind1: req.body.ind1,
            ind2: req.body.ind2 ? req.body.ind2 : null,
            ind3: req.body.ind3 ? req.body.ind3 : null,
            ind4: req.body.ind4 ? req.body.ind4 : null,
            ind5: req.body.ind5 ? req.body.ind5 : null,
            location: req.body.location ? req.body.location : null,
            payment: req.body.payment ? req.body.payment : null,
            startDate: req.body.startDate ? req.body.startDate : null,
            endDate: req.body.endDate ? req.body.endDate : null,
        },
        (err, opp) => {
            if (err) {
                onsole.log(err);
                return res.status(404).json({message: 'An error occured'});
            }
            return res.status(200).json(opp);
        }
    );
};

exports.deleteOpportunity = (req, res, user) => {
    Opportunity.deleteOne({userId: user._id, _id: req.params.oppId}, (err, data) => {
        if (err) {
            onsole.log(err);
            return res.status(404).json({message: 'An error occured'});
        }
        return res.status(200).json(data);
    });
};