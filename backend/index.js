const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const debug = require('debug')('app');
const chalk = require('chalk');
const mongoose= require('mongoose');
const usersSchema = require('./src/models/usersSchema');
const adressesSchema = require('./src/models/adressesSchema');
const countriesSchema = require('./src/models/countriesSchema.js');
const usersRouter = require('./src/routes/usersRouter')(usersSchema, adressesSchema, countriesSchema);
const adressesRouter = require('./src/routes/adressesRouter')(adressesSchema);
const countriesRouter = require('./src/routes/countriesRouter')(countriesSchema);

const app = express();

app.use(cors());
const port = process.env.PORT || 5000;
const URLdb = process.env.DB || 'mongodb://localhost/agendaDB';

mongoose.connect(URLdb, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

app.use(morgan('tiny'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/users', usersRouter);
app.use('/addresses', adressesRouter);
app.use('/countries', countriesRouter);

app.listen(port, () => {
  debug(`Server is running on port ${chalk.green(port)}`);
});
