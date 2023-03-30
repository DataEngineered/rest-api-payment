const express = require('express');
const router = express.Router();
const inquiriesById = require('../middleware/inquiry-middleware');
const inquiriedSignatureById = require('../middleware/inquiry-signaturebyid');
const inquiriesSignatureAmountById = require('../middleware/inquiry-amountsignaturebyid');
const inquiriesTest = require('../middleware/inquiry-middleware-test');
const sendNotifications = require('../middleware/notification-middleware-test');

router.get('/inquiries/:id', inquiriesById.inquiriesByIdSignature);
router.get('/inquire/:id/:signature', inquiriedSignatureById.getSignatureAndIdProd);
router.get('/inquiry/:id/:signature', inquiriesSignatureAmountById.getAmountSignatureById);
router.get('/inquiry-test/:id/:signature', inquiriesTest.getAmountSignatureById);
router.post('/notifications', sendNotifications.createdNotification);

module.exports = router;