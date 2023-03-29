const sqlPoolProd = require('../config/db-config');
// const Inquiry = require('./inquiry');

const InquiryTest = function(inquiryTest){
    this.va_number = inquiryTest.va_number;
    this.amount = inquiryTest.amount;
    this.cust_name = inquiryTest.cust_name;
    this.signature = inquiryTest.signature;
    this.expired_date = inquiryTest.expired_date;
}

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
    this.signature = this.signature;
}

InquiryTest.findByIdSignature = (id, result) => {
    sqlPoolProd.query(`SELECT va_number, amount, cust_name, expired_date FROM payment_test WHERE va_number = ?`, [id] , (err, res) => {
        if(err){
            console.log(err);
            result(err, null);
            return;
        }

        if(res.length){
            result(null, res[0]);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

NotificationsTest.createNotification = (newNotification, result) => {
    sqlPoolProd.query("INSERT INTO notifications_test SET ?", newNotification, (err, res) => {
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        result(null, {id: res.insertId, ...newNotification});
    });
};

module.exports = InquiryTest, NotificationsTest;