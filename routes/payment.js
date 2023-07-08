const express = require('express');
const router = express.Router();
const inquiriesById = require('../middleware/inquiry-middleware');
const inquiriedSignatureById = require('../middleware/inquiry-signaturebyid');
const inquiriesSignatureAmountById = require('../middleware/inquiry-amountsignaturebyid');
const Inquiry = require('../middleware/inquiry-middleware-test');
const notificationMiddlewares = require('../middleware/notification-middleware-test');

// router.get('/inquiries/:id', inquiriesById.inquiriesByIdSignature);
// router.get('/inquire/:id/:signature', inquiriedSignatureById.getSignatureAndIdProd);
// router.get('/inquiry/:id/:signature', inquiriesSignatureAmountById.getAmountSignatureById);

router.get('/inquiry-test/:va_number/:signature', Inquiry.getAmountSignatureByAmount);
router.post('/notifications', [
    notificationMiddlewares.inputNotifsTest,
    notificationMiddlewares.updateStatusCustomerTest,
    notificationMiddlewares.updateStatusRadiusTest,
    notificationMiddlewares.insertAccountingTest
]);

router.post('/notifications', notificationMiddlewares.insertAccountingTest);

module.exports = router;