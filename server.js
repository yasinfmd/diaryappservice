const http = require('http');
const dotenv = require('dotenv');
dotenv.config();
const app = require('./app')
const server = http.createServer(app);
