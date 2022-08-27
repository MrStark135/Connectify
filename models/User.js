const mongoose = require('mongoose');

const { isValid, isTaken, isTooShort, hasWhiteSpaces } = require('../utils/validators');

const UserSchema = new mongoose.Schema(
{
	name:
	{
		type: String,
		required: true,
	},
	email:
	{
		// extended definition for defining a validator
		type: String,
		required: true,
		validate:
		[
			{ validator: isValid, message: props => `${props.value} is not a valid email` },
			// { validator: isTaken.bind(User), message: props => `${props.value} is already taken` }
		]
	},
	password: 
	{
		type: String,
		required: true,
		validate:
		[
			{ validator: isTooShort, message: props => `${props.value} is too short for a password` },
			{ validator: hasWhiteSpaces, message: props => `${props.value} has whitespaces` }
		]
	}
});

const User = new mongoose.model('User', UserSchema);

UserSchema.path('email').validate(isTaken.bind(User), props => `${props.value} is already taken`);

module.exports = User;