const sqlPoolProd = require('../config/db-config');

const NotificationsTest = function(notificationsTest){
    this.trx_id = notificationsTest.trx_id;
    this.merchant_id = notificationsTest.merchant_id;
    this.merchant = notificationsTest.merchant;
    this.bill_no = notificationsTest.bill_no;
    this.payment_date = notificationsTest.payment_date;
    this.payment_status_code = notificationsTest.payment_status_code;
    this.payment_status_desc = notificationsTest.payment_status_desc;
    this.bill_total = notificationsTest.bill_total;
    this.payment_total = notificationsTest.payment_total;
    this.payment_channel_uid = notificationsTest.payment_channel_uid;
    this.payment_channel = notificationsTest.payment_channel;
    this.signature = notificationsTest.signature;
}

NotificationsTest.createNotification = (newNotification, result) => {
    sqlPoolProd.query(
        "INSERT INTO notifications_test SET ?",
        newNotification, (err, res) => {
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        result(null, {id: res.insertId, ...newNotification});
    });
};

module.exports = NotificationsTest;