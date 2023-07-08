const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config({path: ".env"});
const paymentRoutes = require('./routes/payment');
const PORT = process.env.PORT || 6200;

app.use(express.json());

app.use('/payments', paymentRoutes);

app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`)});