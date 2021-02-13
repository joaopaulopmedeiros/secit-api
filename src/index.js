const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const routes = require('./routes/index');
const cors = require('cors');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

mongoose.connect(`${process.env.MONGO_DB_CONNECTION}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);