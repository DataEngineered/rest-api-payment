const sqlPoolProd = require('../config/db-config');

const Inquiry = function(inquiry){
    this.service_id = inquiry.service_id;
    this.transaction_number = inquiry.transaction_number;
    this.customer_id = inquiry.customer_id;
    this.customer_name = inquiry.customer_name;
    this.customer_email = inquiry.customer_email;
    this.customer_phone = inquiry.customer_phone;
    this.product_name = inquiry.product_name;
    this.qty = inquiry.qty;
    this.billing_total = inquiry.billing_total;
    this.tenor = inquiry.tenor;
    this.merchant_id = inquiry.merchant_id;
    this.payment_plan = inquiry.payment_plan;
    this.signature = inquiry.signature;
}

Inquiry.findById = (id, results) => {
    sqlPoolProd.query(`SELECT * FROM dev_payment_gateway WHERE transaction_number = ${id}`, (err, res) => {
        if(err){
            console.log("error: ", err);
            results(err, null);
            return;
        }

        if(res.length){
            results(null, res[0]);
            return;
        }

        results({kind: "not_found"}, null);
    })
}

Inquiry.findSignatureById = (id, results) => {
    sqlPoolProd.query(`SELECT signature FROM dev_payment_gateway WHERE transaction_number = ${id}`, (err, res) => {
        if(err){
            console.log(err);
            results(err, null);
            return;
        }

        if(res.length){
            results(null, res[0].signature);
            return;
        }

        results({kind: "not_found"}, null);
    })
}

Inquiry.findSignatureAmountById = (id, results, signature, amount) => {
    sqlPoolProd.query(`SELECT transaction_number, customer_id, product_name, billing_total FROM dev_payment_gateway WHERE transaction_number = ${id} AND signature = ${signature}`, (err, res) => {
        if(err){
            console.log(err);
            results(err, null);
            return;
        }

        if(res.length){
            const result = res[0];
            if(result.signature === signature){
                console.log("Data: ", result);

                const amountFromDB = result.amount;
                if(amountFromDB == amount){
                    results(null, result);
                } else {
                    results({kind: "invalid_amount"}, null);
                }
            } else {
                results({kind: "not_found"}, null);
            }
        }
    })
}

module.exports = Inquiry;