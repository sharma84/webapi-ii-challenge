//separating index.js and server.js for the testing purpose
//server.js is for endpoint and setup

const express = require("express");
const server = express(); //call express to get server
const postRouter = require("./post-router.js"); //this is the router we will be using; import router

//middleware
server.use(express.json());
server.use("/api/posts", postRouter); //any link that has /api/posts will reroute to postRouter

server.get("/", (req, res) => {
  res.send(`welcome world`);
});

module.exports = server; //export server
