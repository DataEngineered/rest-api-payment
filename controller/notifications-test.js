exports.sendNotifications = (req, res) => {
    const request = req.body.request
    const trx_id = req.body.trx_id
    const merchant_id = req.body.merchant_id
    const merchant = req.body.merchant
    const bill_no = req.body.bill_no
    const payment_reff = req.body.payment_reff
    const payment_date = req.body.payment_date
    const payment_status_code = req.body.payment_status_code
    const payment_status_decs = req.body.payment_status_decs
    const bill_total = req.body.bill_total
    const payment_total = req.body.payment_total
    const payment_channel_uid = req.body.payment_channel_uid
    const payment_channel = req.body.payment_channel
    const signature = req.body.signature

    if(payment_status_code == '00'){
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