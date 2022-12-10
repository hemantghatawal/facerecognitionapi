const dotenv = require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');


// controllers
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

// Database Configuration
const db = knex({
	client: 'pg',
  	connection: {
    host : process.env.DB_HOST,
    port : process.env.DB_PORT,
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_DATABASE
  }
});


const app = express();

app.use(bodyParser.json());
app.use(cors());

// endpoints
app.get('/', (req, res) => {res.send(database.users)});
app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)});
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)});
app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, db)});
app.put('/image', (req, res) => {image.handleImage(req, res, db)});
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)});

app.listen( process.env.PORT || 3000, () => {
	console.log(`This App is running on port ${process.env.PORT}`)
});
