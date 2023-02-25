const InquiryTest = require('../controller/inquiry-test');

exports.getAmountSignatureById = (req, res) => {
    const id = req.params.id;
    const signature = req.params.signature
    const type = req.query.type;
    const trx_uid = req.query.trx_uid;
    const amount = req.query.amount;

    InquiryTest.findByIdSignature(id, (err, data) => {
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({ message: 'Virtual Account Not Found!', response_code: '01'});
            }else{
                res.status(500).send({ message: `Failed to retrieve the data from ${id}`, response_code: '01' });
            }
        } else {
            const inquiryData = {
                response: "VA Static Response",
                ...data,
                type: type,
                trx_uid: trx_uid,
                amount: amount,
                response_code: '00'
            }
            res.send(inquiryData);
        }
    })
}