const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = 3005;
const dbName = 'Capstone_DB'

app.use(cors());
app.use(express.json());

//Models
const userModel = require('./models/userModel');


//Endpoints
const homepageEndpoint = require('./routes/users');
app.use(homepageEndpoint);

const AuthEndpoint = require('./routes/AuthenticationRoutes');
app.use(AuthEndpoint);

const profileEndpoint = require('./routes/profile');
app.use(profileEndpoint);

const {errorHandler, pageNotFoundHandler} = require('./middleware/Error');
app.use(errorHandler);
app.use(pageNotFoundHandler);


//Server Connection

async function connect() {
    try {
        await mongoose.connect(process.env.MONGODB_URL + dbName);
        app.listen(port, () => console.log(`Server attivo sulla porta ${port}`));

    } catch (error) {
        console.log(error);
    }
}
connect();