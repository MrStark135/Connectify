const fs = require('fs');

function createHomePage(user)
{
	fs.mkdirSync(`views/users/${user.id}`); // create a directory for the user
	
	// create the home page
	let template = fs.readFileSync('views/users/homeTemplate.ejs');
	fs.writeFileSync(`views/users/${user.id}/home.ejs`, template);
}

module.exports = { createHomePage };