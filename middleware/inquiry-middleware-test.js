const InquiryTest = require('../controller/inquiry-test');

exports.getAmountSignatureById = (req, res) => {
    const id = req.params.id;
    const signature = req.params.signature
    const type = req.query.type;
    const trx_uid = req.query.trx_uid;
    const amount = req.query.amount;
    const {
        request, merchant_id, merchant, bill_no, bill_reff, bill_date, bill_expired, bill_desc, bill_currency, bill_gross, bill_miscfee, bill_total,
        cust_no, cust_name, payment_channel, pay_type, bank_userid, msisdn, email, terminal, billing_name, billing_lastname, billing_address,
        billing_address_city, billing_address_region, billing_address_state, billing_address_poscode, billing_msisdn, billing_address_country_code,
        receiver_name_for_shipping, shipping_lastname, shipping_address, shipping_address_city, shipping_address_region, shipping_address_state,
        shipping_address_poscode, shipping_msisdn, shipping_address_country_code, item, reserve1, reserve2 } = req.body;

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