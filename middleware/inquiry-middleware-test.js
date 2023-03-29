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
            const currentDate = new Date();
            const expiredDate = new Date(data.expired_date);

            if(currentDate > expiredDate){
                res.status(403).send({ message: 'Expired Virtual Account!', response_code: '01'});
                return;
            }

            const inquiryData = {
                response: "VA Static Response",
                ...data,
                response_code: '00'
            }
            res.send(inquiryData);
        }
    })
}