const sqlPoolProd = require('../config/db-config');

// const NotificationsTest = function(notificationsTest){
//     this.trx_id = notificationsTest.trx_id;
//     this.merchant_id = notificationsTest.merchant_id;
//     this.merchant = notificationsTest.merchant;
//     this.bill_no = notificationsTest.bill_no;
//     this.payment_date = notificationsTest.payment_date;
//     this.payment_status_code = notificationsTest.payment_status_code;
//     this.payment_status_desc = notificationsTest.payment_status_desc;
//     this.bill_total = notificationsTest.bill_total;
//     this.payment_total = notificationsTest.payment_total;
//     this.payment_channel_uid = notificationsTest.payment_channel_uid;
//     this.payment_channel = notificationsTest.payment_channel;
//     this.signature = notificationsTest.signature;
// }

// NotificationsTest.createNotification = (newNotification, result) => {
//     sqlPoolProd.query(
//         "INSERT INTO notifications_test SET ?",
//         newNotification, (err, res) => {
//         if(err){
//             console.log("error: ", err);
//             result(err, null);
//             return;
//         }

//         result(null, {id: res.insertId, ...newNotification});
//     });
// };

const CustomerSub = function(customerSub){
    this.id = customerSub.id,
    this.personal_id = customerSub.personal_id,
    this.tagihan_id = customerSub.tagihan_id,
    this.alamat_terpasang = customerSub.alamat_terpasang,
    this.mulai_berlangganan = customerSub.mulai_berlangganan,
    this.subscribe_expired = customerSub.subscribe_expired,
    this.subscribe_status = customerSub.subscribe_status,
    this.nama = customerSub.nama;
    this.nama_layanan = customerSub.nama_layanan,
    this.username = customerSub.username,
    this.payment = customerSub.payment,
    this.date = customerSub.date,
    this.va_number = customerSub.va_number,
    this.trx_id = customerSub.trx_id;
    this.merchant_id = customerSub.merchant_id;
    this.merchant = customerSub.merchant;
    this.bill_no = customerSub.bill_no;
    this.payment_date = customerSub.payment_date;
    this.payment_status_code = customerSub.payment_status_code;
    this.payment_status_desc = customerSub.payment_status_desc;
    this.bill_total = customerSub.bill_total;
    this.payment_total = customerSub.payment_total;
    this.payment_channel_uid = customerSub.payment_channel_uid;
    this.payment_channel = customerSub.payment_channel;
    this.signature = customerSub.signature;
};

const selectPaketUserQuery = `SELECT
cp.id personal_id,
cp.nama nama,
sp.nama_layanan nama_layanan
FROM dasarata_customer.customer_subscribes cs
INNER JOIN dasarata_customer.customer_personals cp ON cs.personal_id = cp.id
INNER JOIN dasarata_marketing.service_packages sp ON cs.paket_id = sp.id
INNER JOIN dasarata_customer.payment_bills pb ON cs.personal_id = pb.customer_personal_id
INNER JOIN dasarata_customer.va_customers vac ON pb.va_customer_id = vac.id
WHERE CONCAT(vac.chanel_id, pb.va_customer_id) = ?`;

const selectTagihanID = `
SELECT
dcpb.id tagihan_id,
dcpb.customer_personal_id personal_id,
dccs.subscribe_expired,
CONCAT(ch.id, dcva.id) va_number
FROM dasarata_customer.payment_bills dcpb
INNER JOIN dasarata_customer.customer_subscribes dccs ON dcpb.customer_personal_id = dccs.personal_id
INNER JOIN dasarata_customer.va_customers dcva ON dcpb.va_customer_id = dcva.id
INNER JOIN dasarata_payment.channels ch ON ch.id = dcva.chanel_id
WHERE CONCAT(ch.id, dcva.id) = ?
`;

const selectInsertAccounting = `
SELECT
dccp.nama AS nama,
dpn.pembayaran AS amount,
MAX(dphp.update_at) AS date
FROM dasarata_payment.notifications dpn
INNER JOIN dasarata_payment.history_paids dphp ON dpn.id = dphp.notifikasi_id
INNER JOIN dasarata_customer.customer_subscribes dccs ON dphp.customer_id = dccs.personal_id
INNER JOIN dasarata_customer.customer_personals dccp ON dccs.personal_id = dccp.id
INNER JOIN dasarata_customer.payment_bills dcpb ON dccp.id = dcpb.customer_personal_id
INNER JOIN dasarata_customer.va_customers dcva ON dcpb.va_customer_id = dcva.id
WHERE CONCAT(dcva.chanel_id,dcva.id) = ?`;

const insertHistory = `INSERT INTO history_paids (notifikasi_id, customer_id, create_at, update_at) VALUES (?, ?, ?, ?)`;
const insertNotification = 'INSERT INTO notifications (id, tagihan_id, pembayaran, status_paid) VALUES (?, ?, ?, ?)';
const updateIsolirQuery = 'UPDATE dasarata_customer.customer_subscribes SET subscribe_expired = DATE_ADD(CURRENT_DATE(), INTERVAL 30 DAY), subscribe_status = ? WHERE personal_id = ?';
const updateAktifQuery = 'UPDATE dasarata_customer.customer_subscribes SET subscribe_expired = DATE_ADD(subscribe_expired, INTERVAL DATEDIFF(subscribe_expired, CURDATE()) + 30 DAY), subscribe_status = ? WHERE personal_id = ?';
const updatePraWo = 'UPDATE dasarata_customer.customer_subscribes SET subscribe_status = ? WHERE personal_id = ?';

CustomerSub.selectPaketUser = (id, result) => {
    sqlPoolProd.query(
        selectPaketUserQuery, [id], (err, res) => {
            if(err){
                result(err, null);
                return;
            }else{
                if(res.length > 0){
                    result(null, res[0]);
                    return;
                }else{
                    result({kind: "not_found"}, null);
                }
            }
        }
    );
};

CustomerSub.updateSubCustomerIsolir = (newSubCustomerIsolir, result) => {
    sqlPoolProd.query(
        updateIsolirQuery, newSubCustomerIsolir, (err, res) => {
            if(err){
                result(err, null);
                return;
            }else{
                result(null, {results: res.insertId, ...newSubCustomerIsolir});
            }
        }
    )
}

CustomerSub.updateSubCustomerAktif = (newSubCustomerAktif, result) => {
    sqlPoolProd.query(
        updateAktifQuery, newSubCustomerAktif, (err, res) => {
            if(err){
                result(err, null);
                return;
            }else{
                result(null, {results: res.insertId, ...newSubCustomerAktif})
            }
        }
    )
}

CustomerSub.updateSubCustomerPraWO = (newSubCustomerPraWo, result) => {
    sqlPoolProd.query(
        updatePraWo, newSubCustomerPraWo, (err, res) => {
            if(err){
                result(err, null);
                return;
            }else{
                result(null, {results: res.insertId, ...newSubCustomerPraWo})
            }
        }
    )
}

CustomerSub.insertPaymentNotification = (newPaymentNotification, result) => {
    sqlPoolProd.query(
        insertNotification, newPaymentNotification, (err, res) => {
            if(err){
                result(err, null);
                return;
            }else{
                result(null, {results: res.insertId, ...newPaymentNotification})
            }
        }
    )
}

CustomerSub.insertHistoryPayment = (newHistoryPayment, result) => {
    sqlPoolProd.query(
        insertHistory, newHistoryPayment, (err, res) => {
            if(err){
                result(err, null);
                return;
            }else{
                result(null, {results: res.insertId, ...newHistoryPayment})
            }
        }
    )
}

CustomerSub.selectTagihanFromVa = (va, result) => {
    sqlPoolProd.query(selectTagihanID, [va], (err, res) => {
        if(err){
            result(err, null);
            return;
        }else{
            if(res.length > 0){
                result(null, res[0]);
                return;
            }else{
                result({kind: "not_found"}, null);
            }
        }
    })
};

CustomerSub.selectInsertIntoAccounting = (va, result) => {
    sqlPoolProd.query(selectInsertAccounting, [va], (err, res) => {
        if(err){
            result(err, null);
            return;
        }else{
            if(res.length > 0){
                result(null, res[0]);
                return;
            }else{
                result({kind: "not_found"}, null);
            }
        }
    })
};

CustomerSub.insertIntoNotification = (newNotification, result) => {
    sqlPoolProd.query(
        'INSERT INTO `history_paids`(`trx_id`, `merchant_id`, `merchant`, `bill_no`, `payment_date`, `payment_status_code`, `payment_status_desc`, `bill_total`, `payment_total`, `payment_channel_uid`, `payment_channel`, `signature`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        newNotification, (err, res) => {
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        result(null, {id: res.insertId, ...newNotification});
    });
}

module.exports = CustomerSub;