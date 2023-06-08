const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
dotenv.config({path: ".env"});
const sqlPoolProd = require('./config/db-config');
const paymentRoutes = require('./routes/payment');
const { default: helmet } = require('helmet');
const PORT = process.env.PORT || 6200;

app.use(cors());
app.use(express.json());
app.use(helmet());

app.use('/payments', paymentRoutes);

app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`)});