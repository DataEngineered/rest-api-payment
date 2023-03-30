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

// app.get('/api', (req, res) => {
//     const apiKey = req.query.apiKey;

//     res.send({ data: 'Hahahaha' });
// });

// app.get ('/test', (req, res) => {
//     const nama = req.query.nama;
//     const va = req.query.va;

//     res.send({
//         nama: nama,
//         va: va
//     });
// });

app.get('/api/:param1/:param2', (req, res) => {
    const param1 = req.params.param1;
    const param2 = req.params.param2;
    const queryParam = req.query.queryParam;
    // res.send(`Parameter 1: ${param1}, Parameter 2: ${param2}, Query Parameter: ${queryParam}`);
    sqlPoolProd.query('SELECT * FROM `dev_payment_gateway`', (err, results, fields) => {
        console.log(results);
        // console.log(fields);
    })
});

app.use('/payments', paymentRoutes);
// const vAcct = (req, res, next) => {
//     const va = req.params.va;
//     next();
// }


app.get('/:va', (req, res, next) => {
    const va = req.params.va;
    next();
})

// app.get('/inquiry-trx/:va', (req, res) => {
//     const vAcct = req.params.va;
//     const userId = process.env.FP_USER;
//     const password = process.env.FP_PASS;

//     if(!vAcct){
//         res.status(400).send({ error: 'Bad Request' });
//     } else {
//         res.redirect(`http://localhost:${PORT}/inquiry-trx/${req.params.va}/${sha1(md5(userId+password+vAcct))}?type=inquiry`);
//         res.send({va: vAcct, status: "Berhasil"});
//     }
// })

app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`)});