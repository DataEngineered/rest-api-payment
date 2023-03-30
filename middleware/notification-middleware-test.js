const NotificationsTest = require('../controller/notifications-test');

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
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Notifications."
            });
        else res.send(data);
    });
}