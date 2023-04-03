const NotificationsTest = require('../controller/notifications-test');
const sqlPoolProd = require('../config/db-config');

exports.createdNotification = (req, res) => {
    if (!req.body){
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const notificationTest = new NotificationsTest({
        trx_id: req.body.trx_id,
        merchant_id: req.body.merchant_id,
        merchant: req.body.merchant,
        bill_no: req.body.bill_no,
        payment_date: req.body.payment_date,
        payment_status_code: req.body.payment_status_code,
        payment_status_desc: req.body.payment_status_desc,
        bill_total: req.body.bill_total,
        payment_total: req.body.payment_total,
        payment_channel_uid: req.body.payment_channel_uid,
        payment_channel: req.body.payment_channel,
        signature: req.body.signature
    });

    NotificationsTest.createNotification(notificationTest, (err, data) => {
        const paymentTimestamp = new Date(req.body.payment_date);
        const updateQuery = `UPDATE payment_test SET status = ?, payment_paid = ? WHERE va_number = ?`;
        sqlPoolProd.query(updateQuery, [req.body.payment_status_code, paymentTimestamp, req.body.trx_id], (err, res) => {
            if(err){
                console.log("error: ", err);
            }
        });

        if (err){
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Notifications."
            });
        }
        else {
            const trxID = data.trx_id;
            const merchantId = data.merchant_id;
            const merchantName = data.merchant_name;
            const billNo = data.bill_no;
            const currentDate = new Date();

            const inquiryData = {
                response: "Payment Notification",
                trx_id: trxID,
                merchant_id: merchantId,
                merchant_name: merchantName,
                bill_no: billNo,
                //...data,
                response_code: '00',
                response_desc: 'Success',
                response_date: currentDate
            }

            res.send(inquiryData);
        }
    });
}