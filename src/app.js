const express = require('express');
const routes = require('./routes/index');
const cors = require('cors');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const initializeDatabase = require('./utils/initializeDatabase');

initializeDatabase();

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors());
app.use(express.json());

app.use(routes);

module.exports = app;