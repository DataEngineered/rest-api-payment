const sqlPoolProd = require('../config/db-config');
// const Inquiry = require('./inquiry');

const InquiryTest = function(inquiryTest){
    this.va_static = inquiryTest.va_static;
    this.amount = inquiryTest.amount;
    this.customer_name = inquiryTest.customer_name;
    this.signature = inquiryTest.signature;
}

InquiryTest.findByIdSignature = (id, result) => {
    sqlPoolProd.query(`SELECT va_static, amount, customer_name FROM payment_test WHERE va_static = ${id}`, (err, res) => {
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
    })
}

module.exports = InquiryTest;