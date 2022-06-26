const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const db = require('./models')
const seed = require('./seeders/index');

dotenv.config({ path: './config/.env'});

const run = async () => {
    await db.initialize();
    await db.sequelize.sync({ force: true });
    await seed();
}

run();

const customerRoutes = require('./routes/customerRoutes');
const companyRoutes = require('./routes/companyRoutes');

const app = express();
app.use(express.json());  // body parser

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use('/api/customers', customerRoutes);
app.use('/api/companies', companyRoutes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));
