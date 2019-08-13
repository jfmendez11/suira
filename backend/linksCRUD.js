const Link = require('../config/mongoose/links');
const AWS = require('aws-sdk');

AWS.config.update({
    region: process.env.AWS_SES_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

exports.getLinks = (req, res) => {
    Link.find((err, rows) => {
        if (err) {
            console.log(err);
            return res.status(404).json({message: 'An error occured'});
        }
        return res.status(200).json(rows);
    });
};

exports.getLinkById = (req, res) => {
    Link.findById(req.params._id, (err, link) => {
        if (err) {
            console.log(err);
            return res.status(404).json({message: 'An error occured'});
        }
        return res.status(200).json(link);
    });
};

exports.createLink = (req, res, user) => {
    const newLink = new Link({
        href: req.body.href,
        networkName: req.body.networkName,
    });
    newLink.save((err) => {
        if (err) {
            console.log(err);
            return res.status(404).json({message: 'An error occured'});
        }
        return res.status(200).json(newLink);
    });
};

exports.updateLink = (req, res, user) => {
    Link.updateOne({_id: req.params.linkId},
        {
            href: req.body.href,
            networkName: req.body.networkName,
        },
        (err, link) => {
            if (err) {
                onsole.log(err);
                return res.status(404).json({message: 'An error occured'});
            }
            return res.status(200).json(link);
        }
    );
};

exports.deleteLink = (req, res, user) => {
    Link.deleteOne({_id: req.params.linkId}, (err, data) => {
        if (err) {
            onsole.log(err);
            return res.status(404).json({message: 'An error occured'});
        }
        return res.status(200).json(data);
    });
};