const InquiriesProd = require('../controller/inquiry');

exports.getAmountSignatureById = (req, res) => {
    const id = req.params.id;
    const signature = req.params.signature;
    const type = req.query.type;
    const trx_uid = req.query.trx_uid;
    const amount = req.query.amount;

    InquiriesProd.findById(id, (err, inquiryData) => {
        if(err){
            if (err.kind === "not_found") {
                res.status(404).send({ message: `Inquiry with id ${id} Not Found!` })
            } else {
                res.status(500).send({ message: `Failed to retrieve the signature for inquiry with id ` + id })
            }
        } else {
            const data = {
                ...inquiryData,
                signature: signature,
                type: type,
                trx_uid: trx_uid,
                amount: amount
            };
            res.send(data);
        }
    })
}