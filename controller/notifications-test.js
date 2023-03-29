const sqlPoolProd = require('../config/db-config');

exports.sendNotifications = (req, res) => {
    const {request, trx_id, merchant_id, merchant, bill_no, payment_reff, payment_date,
        payment_status_code, payment_status_desc, bill_total, payment_total, payment_channel_uid,
        payment_channel, signature} = req.body

    if(payment_status_code == '2'){
        res.status(200).send({
            trx_id : trx_id,
            merchant_id : merchant_id ,
            bill_no : bill_no,
            response_code: payment_status_code,
            response_desc :'success',
            respone_date : new Date().toISOString()
        });
    } else {
        res.status(404).send({
            response_code: payment_status_code,
            response_desc :'failed',
            respone_date : new Date().toISOString()
        });
    }
}