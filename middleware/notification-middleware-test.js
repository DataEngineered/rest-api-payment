const CustomerSub = require('../controller/notifications-test');

exports.inputNotifsTest = (req, res, next) => {
    const {
        trx_id, merchant_id, merchant, payment_date, payment_status_desc, bill_no, payment_total, payment_status_code, bill_total,
        payment_channel_uid, payment_channel, signature
    } = req.body;
    inputIntoNotification = [trx_id, merchant_id, merchant, bill_no, payment_date, payment_status_code, payment_status_desc, bill_total, payment_total,
    payment_channel_uid, payment_channel, signature];

    CustomerSub.insertIntoNotification(inputIntoNotification, (err, result) => {
        if(err){
            console.log(err);
            res.send("Error: ", err);
        }else{
            if(payment_status_code === "2"){
                next();
            }else{
                res.send({
                    message: "Failed"
                })
            }
        }
    })
}

exports.updateStatusCustomerTest = (req, res, next) => {
    const {bill_no} = req.body;
    selectFromVA = [bill_no];
    CustomerSub.selectTagihanFromVa(selectFromVA, (err, data) => {
        if(err){
            res.send('Error: ', err);
            console.log(err);
        }else{
            const CurrDate = new Date();
            const personalId = data.personal_id;
            const subscribeExpired = data.subscribe_expired
            if (subscribeExpired === null) {
                const status = 'Paid';
                const newSubCustomerPraWO = [status, personalId];
                CustomerSub.updateSubCustomerPraWO(newSubCustomerPraWO, (err, result) => {
                    if(err){
                        console.log(err);
                    }else{
                        // res.send({
                        //     status: 'Paid'
                        // })
                        next('route');
                    }
                });
            } else {
                if (subscribeExpired > CurrDate) {
                    const status = 'Aktif Berlangganan';
                    const newSubCustomerAktivated = [status, personalId];
                    CustomerSub.updateSubCustomerAktif(newSubCustomerAktivated, (err, result) => {
                        if(err){
                            console.log(err);
                        }else{
                            // res.send({
                            //     status: 'Aktif'
                            // })
                            next();
                        }
                    })
                } else if (subscribeExpired <= CurrDate) {
                    const status = 'Aktif Berlangganan';
                    const newSubCustomerIsolired = [status, personalId];
                    CustomerSub.updateSubCustomerIsolir(newSubCustomerIsolired, (err, result) => {
                        if(err){
                            console.log(err);
                        }else{
                            // res.send({
                            //     status: 'Isolir'
                            // })
                            next();
                        }
                    })
                }
            }
        }
    });
}

exports.updateStatusRadiusTest = async (req, res, next) => {
    const {bill_no} = req.body
    CustomerSub.selectPaketUser(bill_no, async (err, result) => {
        if(err){
            res.send({err});
        }else{
            const namaLayanan = result.nama_layanan;
            const personalId = result.personal_id;
            let query = '/user-manager/user';
            if(query){
                query += `/${personalId}`;
            }
            const updateToPaket = await clientRosRest.set(query, {
                group: namaLayanan
            })

            const userSession = await clientRosRest.command('/user-manager/session/print', {
                '.proplist': '.id,user,active',
                '.query': [`user=${personalId}`]
            });

            for(let i = userSession.data.length - 1; i>=0; i--){
                const deleteSession = await clientRosRest.command('/user-manager/session/remove',{
                    '.id': `${userSession.data[i]['.id']}`
                })
            }
            next();
        }
    })
}

exports.insertAccountingTest = async (req, res) => {
    try {
        const {bill_no, payment_total, payment_date} = req.body;
        CustomerSub.selectInsertIntoAccounting(bill_no, async (err, data) => {
            if(err){
                res.send({'Error': err});
            }else{
                const nama_cust = data.nama;
                const scriptUrl = 'https://script.google.com/macros/s/AKfycbxCU0-4Zn0t7OePPA0_NomFl-dF3ezRTaRB3J-7yAp6tLK06-ssNDkvbBbZraUkoYx4/exec';
                const response = await axios.post(scriptUrl, {bill_no, nama_cust, payment_total, payment_date});

                const responseData = {
                    status: response.status,
                    statusText: response.statusText,
                    data: response.data,
                };

                res.json(responseData);
            }
        })

      } catch (error) {
        res.status(500).json({ Error: 'Internal server error' });
      }
}

// exports.createdNotification = (req, res) => {
//     if (!req.body){
//         res.status(400).send({
//             message: "Content can not be empty!"
//         });
//     }

//     const notificationTest = new NotificationsTest({
//         trx_id: req.body.trx_id,
//         merchant_id: req.body.merchant_id,
//         merchant: req.body.merchant,
//         bill_no: req.body.bill_no,
//         payment_date: req.body.payment_date,
//         payment_status_code: req.body.payment_status_code,
//         payment_status_desc: req.body.payment_status_desc,
//         bill_total: req.body.bill_total,
//         payment_total: req.body.payment_total,
//         payment_channel_uid: req.body.payment_channel_uid,
//         payment_channel: req.body.payment_channel,
//         signature: req.body.signature
//     });

//     NotificationsTest.createNotification(notificationTest, (err, data) => {
//         const paymentTimestamp = new Date(req.body.payment_date);
//         const updateQuery = `UPDATE payment_test SET status = ?, payment_paid = ? WHERE va_number = ?`;
//         sqlPoolProd.query(updateQuery, [req.body.payment_status_code, paymentTimestamp, req.body.trx_id], (err, res) => {
//             if(err){
//                 console.log("error: ", err);
//             }
//         });

//         if (err){
//             res.status(500).send({
//                 message:
//                     err.message || "Some error occurred while creating the Notifications."
//             });
//         }
//         else {
//             const trxID = data.trx_id;
//             const merchantId = data.merchant_id;
//             const merchantName = data.merchant_name;
//             const billNo = data.bill_no;
//             const currentDate = new Date();

//             const inquiryData = {
//                 response: "Payment Notification",
//                 trx_id: trxID,
//                 merchant_id: merchantId,
//                 merchant_name: merchantName,
//                 bill_no: billNo,
//                 //...data,
//                 response_code: '00',
//                 response_desc: 'Success',
//                 response_date: currentDate
//             }

//             res.send(inquiryData);
//         }
//     });
// }