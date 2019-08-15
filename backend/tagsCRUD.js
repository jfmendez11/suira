const Tag = require('../config/mongoose/tags');
const AWS = require('aws-sdk');

AWS.config.update({
    region: process.env.AWS_SES_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

exports.getTags = (req, res) => {
    Tag.find((err, rows) => {
        if (err) {
            console.log(err);
            return res.status(404).json({message: 'An error occured'});
        }
        return res.status(200).json(rows);
    });
};

exports.getTagById = (req, res) => {
    Tag.findById(req.params._id, (err, tag) => {
        if (err) {
            console.log(err);
            return res.status(404).json({message: 'An error occured'});
        }
        return res.status(200).json(tag);
    });
};

exports.createTag = (req, res, user) => {
    const newTag = new Tag({
        name: req.body.name,
        industry: req.body.industry,
    });
    newTag.save((err) => {
        if (err) {
            console.log(err);
            return res.status(404).json({message: 'An error occured'});
        }
        return res.status(200).json(newTag);
    });
};

exports.updateTag = (req, res, user) => {
    Tag.updateOne({_id: req.params.tagId},
        {
            name: req.body.name,
            industry: req.body.industry,
        },
        (err, tag) => {
            if (err) {
                onsole.log(err);
                return res.status(404).json({message: 'An error occured'});
            }
            return res.status(200).json(tag);
        }
    );
};

exports.deleteTag = (req, res, user) => {
    Tag.deleteOne({_id: req.params.tagId}, (err, data) => {
        if (err) {
            onsole.log(err);
            return res.status(404).json({message: 'An error occured'});
        }
        return res.status(200).json(data);
    });
};