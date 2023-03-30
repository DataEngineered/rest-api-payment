const sqlPoolProd = require('../config/db-config');

const InquiryTest = function(inquiryTest){
    this.va_number = inquiryTest.va_number;
    this.amount = inquiryTest.amount;
    this.cust_name = inquiryTest.cust_name;
    this.signature = inquiryTest.signature;
    this.expired_date = inquiryTest.expired_date;
    this.status = inquiryTest.status;
    this.payment_paid = inquiryTest.payment_paid;
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

module.exports = InquiryTest;