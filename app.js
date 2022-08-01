require('dotenv').config();
const Server = require('./models/server');

const server = new Server();

// Lanzamos el metodo listen();
server.listen();

