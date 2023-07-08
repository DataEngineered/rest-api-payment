const Inquiry = require('../controller/inquiry-test');

exports.getAmountSignatureByAmount = (req, res) => {
    const {va_number, signature} = req.params;
    const {type, trx_uid, amount} = req.query;

    Inquiry.findByVASignature(va_number, (err, data) => {
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({ message: 'Virtual Account Not Found!', response_code: '01'});
            }else{
                res.status(500).send({ message: `Failed to retrieve the data`, response_code: '01' });
            }
        }else{
            if(type === "inquiry"){
                const currentDate = new Date();
                const expiredDate = new Date(data.expired_date);
                const vaNumber = data.va_number;
                const amount = data.amount;
                const custName = data.cust_name;

                if(currentDate > expiredDate){
                    res.status(403).send({ message: 'Expired Virtual Account!', response_code: '01'});
                    return;
                }

                const inquiryData = {
                    response: "VA Static Response",
                    va_number: vaNumber,
                    amount: amount,
                    cust_name: custName,
                    response_code: "00"
                }

                res.send(inquiryData);
            } else if(type === "payment") {
                const vaNumber = data.va_number;
                const amount = data.amount;
                const custName = data.cust_name;

                const inquiryData = {
                    response: "VA Static Response",
                    va_number: vaNumber,
                    amount: amount,
                    cust_name: custName,
                    response_code: "00"
                }

                res.send(inquiryData);
            } else {
                res.send({message: 'Could not determined which type of Inquiry'})
            }
        }
    })
}

// exports.getAmountSignatureById = (req, res) => {
//     const id = req.params.id;
//     const signature = req.params.signature
//     const type = req.query.type;
//     const trx_uid = req.query.trx_uid;
//     const amount = req.query.amount;

//     InquiryTest.findByIdSignature(id, (err, data) => {
//         if(err){
//             if(err.kind === "not_found"){
//                 res.status(404).send({ message: 'Virtual Account Not Found!', response_code: '01'});
//             }else{
//                 res.status(500).send({ message: `Failed to retrieve the data from ${id}`, response_code: '01' });
//             }
//         } else {
//             const currentDate = new Date();
//             const expiredDate = new Date(data.expired_date);
//             const vaNumber = data.va_number;
//             const amount = data.amount;
//             const custName = data.cust_name;
//             const signature = data.signature;

//             if(currentDate > expiredDate){
//                 res.status(403).send({ message: 'Expired Virtual Account!', response_code: '01'});
//                 return;
//             }

//             const inquiryData = {
//                 response: "VA Static Response",
//                 va_number: vaNumber,
//                 amount: amount,
//                 cust_name: custName,
//                 signature: signature,
//                 response_code: "00"
//             }
//             res.send(inquiryData);
//         }
//     })
// }