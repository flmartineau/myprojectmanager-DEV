require('./config/config');
require('./database/database');
require('./config/passport.config');

const express = require('express');
const bodyParse = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const indexRoutes = require('./routes/index.router');
const projectRoutes = require('./routes/projects.router');

const app = express();

app.use(bodyParse.json());
app.use(cors());
app.use(passport.initialize());

app.use('/api', indexRoutes);
app.use('/api/projects', projectRoutes);


app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        const valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(442).send(valErrors);
    }
});

app.listen(process.env.PORT, () => {
    console.log('Démarrage du serveur sur le port :' + process.env.PORT);
});