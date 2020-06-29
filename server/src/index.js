const authController = require('./controllers/auth');
const db = require('./models');

const express = require('express');

const app = express();

app.use('/auth', authController);

db.sequelize.sync().then( () => {
    app.listen(3001, () => {
        console.log('Listening on port 3001');
    });
});

