// load env vars
require('dotenv').config();
const host = process.env.HOST;
const port = process.env.PORT;
const dbName = process.env.DATABASE;

// server
const express = require('express');
const app = express();
app.listen(port, (error) => console.log(error || `server running ${host}:${port}`));

// view engine for rendering web pages
// not required, but it's good for passing content
// from server to client web page
app.set('view engine', 'ejs');
// JSON parsing
app.use(express.json());
// body parsing, for POST requests usually
app.use(express.urlencoded({ extended: true }));

// index route '/'
app.get('/', (req, res) =>
{
	res.render('index');
});

const User = require('./models/User');

// login route '/login' for authenticating users
app.post('/login', async (req, res) =>
{
	// password check
	const user = (await User.find({ email: req.body.email }))[0];
	if (user == undefined)
	{
		res.send(`Couldn't find a user with email ${req.body.email}`);
		return;
	}
	if (req.body.password !== user.password)
	{
		res.send(`Incorrect password for the user ${user.name}`);
		return;
	}
	
	res.redirect(`/users/${user.id}/home`);
});

// routes '/users/*'
const userRouter = require('./routes/users');
app.use('/users', userRouter);

// default route '*'
app.get('*', (req, res) =>
{
	res.render('error page');
});

// database initialization
const mongoose = require('mongoose');
mongoose.connect(`mongodb://${host}/${dbName}`,
	error => console.log(error || `db connected to ${host}/${dbName}`));