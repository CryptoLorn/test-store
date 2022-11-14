require('dotenv').config();

const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const path = require('path');

const sequelize = require('./db');
const models = require('./models/dependencies');
const router = require('./routes/index');
const {PORT} = require('./configs/config');
const errorHandler = require('./error/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'poster')));
app.use(fileUpload({}));
app.use('/api', router);
app.use(errorHandler);

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log(`Server on port ${PORT}`));
    } catch (e) {
        console.log(e);
    }
}

start();