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

app.get('/api/:param1/:param2', (req, res) => {
    const param1 = req.params.param1;
    const param2 = req.params.param2;
    const queryParam = req.query.queryParam;
    sqlPoolProd.query('SELECT * FROM `dev_payment_gateway`', (err, results, fields) => {
        console.log(results);
    })
});

app.use('/payments/inquiry-test', paymentRoutes);


app.get('/:va', (req, res, next) => {
    const va = req.params.va;
    next();
})

app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`)});