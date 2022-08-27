// email validators for saving to mongodb
async function isTaken(newEmail)
{
	const User = this; // just to make code more readable
	
	// check the email against the db
	let users = await User.find();
	for (let i = 0; i < users.length; i++)
	{
		let user = users[i];
		
		if (user.email == newEmail) return false;
	}
	
	// if it got here, it's not taken
	return true;
}
function isValid(newEmail)
{
	// if it doesn't include a @, not valid mail
	if (!newEmail.includes('@')) return false;
}

// password validation
function isTooShort(newPassword)
{
	// if the password is too short
	return newPassword.length >= 8;
}
function hasWhiteSpaces(newPassword)
{
	// if it contains whitespaces
	return !newPassword.includes(' ');
}

module.exports = { isValid, isTaken, isTooShort, hasWhiteSpaces };