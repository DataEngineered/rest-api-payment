const InquiriesProd = require('../controller/inquiry');

exports.inquiriesByIdSignature = (req, res) => {
    InquiriesProd.findById(req.params.id, (err, data) => {
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({ message: 'Virtual Account Not Found!'});
            }else{
                res.status(500).send({ message: `Failed to retrieve the data from ` + req.params.id});
            }
        } else res.send(data);
    })
};