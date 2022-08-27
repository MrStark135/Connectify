## Instructions

To use the app, you have to install the needed dependencies first (package.json is provided) and then run the server with nodejs. Also make sure a mnogodb database exists with the specified name.

*IMPORTANT: Notice that the server will run on the specified host and port, and connect to the given database name. These are all located in .env, so make sure to create that file.*
```bash
npm install
npm run start
```
Once the server is running (it will log a message saying everything went fine), navigate to the url where it's located (localhost:`<PORT>`).