const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const mongodb = require('./config/database');
const bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-key');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next(); 
});
app.use('/', require('./routes/swagger'));
app.use('/', require('./routes/hospital'));

mongodb.initdb((err) => {
    if (err) {
        console.log(err);
    } else {
       app.listen(PORT, () => {console.log(`Database conntected and Server is listening on port ${PORT}`)});
    }
})