const Search = require('../config/mongoose/searches');
const AWS = require('aws-sdk');

AWS.config.update({
    region: process.env.AWS_SES_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

exports.getSearches = (req, res) => {
    Search.find((err, rows) => {
        if (err) {
            console.log(err);
            return res.status(404).json({message: 'An error occured'});
        }
        return res.status(200).json(rows);
    });
};

exports.getSearchById = (req, res) => {
    Search.findById(req.params._id, (err, search) => {
        if (err) {
            console.log(err);
            return res.status(404).json({message: 'An error occured'});
        }
        return res.status(200).json(search);
    });
};

exports.createSearch = (req, res, user) => {
    const newSearch = new Search({
        search: req.body.search,
    });
    newSearch.save((err) => {
        if (err) {
            console.log(err);
            return res.status(404).json({message: 'An error occured'});
        }
        return res.status(200).json(newSearch);
    });
};

exports.updateSearch = (req, res, user) => {
    Search.updateOne({_id: req.params.searchId},
        {
            search: req.body.search,
        },
        (err, search) => {
            if (err) {
                onsole.log(err);
                return res.status(404).json({message: 'An error occured'});
            }
            return res.status(200).json(search);
        }
    );
};

exports.deleteSearch = (req, res, user) => {
    Search.deleteOne({_id: req.params.searchId}, (err, data) => {
        if (err) {
            onsole.log(err);
            return res.status(404).json({message: 'An error occured'});
        }
        return res.status(200).json(data);
    });
};