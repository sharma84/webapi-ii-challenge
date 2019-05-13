//yarn add express
//yarn server is in package.json so we can run it
//nodemon - after any change server will restart


//import the server from server.js
const server = require('./server.js');

//listening
server.listen(9090, () => {
    console.log("listening on port 9090");
  });
  