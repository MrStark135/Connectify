const express = require('express');
const router = express.Router();

// DB for storing the users credentials
const mongoose = require('mongoose');
const User = require('../models/User');

// get all users
router.get('/', async (req, res) =>
{
	res.render('users/all', { users: await User.find() });
});

// new user form
router.get('/new', (req, res) =>
{
	res.render('users/register');
});
// make a new user (this will be sent internally)
router.post('/', async (req, res) =>
{
	const newUser = new User(
	{
		name: req.body.name,
		email: req.body.email,
		password: req.body.password
	});
	
	// run validators to see if everything is ok before proceeding
	try { await newUser.save(); }
	catch(err)
	{
		res.render('serverError', { error: err });
		return; // to prevent further setting for the user
	}
	
	// create a home page
	try { require('../utils/createUserData').createHomePage(newUser); }
	catch(err) { res.render('serverError', {  error: err }); return; }
	// res.render(`users/${newUser.id}/home`, { user: newUser });
	res.redirect(`users/${newUser.id}/home`);
});

// get the home page for ':id' user
router.get('/:id/:page', async (req, res) =>
{
	let user = await User.findById(req.params.id);
	res.render(`users/${req.params.id}/${req.params.page}`, { user: user });
});

module.exports = router;