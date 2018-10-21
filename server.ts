const express = require('express');
const app = express();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer);
const path = require('path');

const port = process.env.PORT || '8080';


declare var __rootPath: string;
declare var pathFromRoot: any;
global.__rootPath = path.resolve(__dirname);
global.pathFromRoot = (...pathSegments: string[]): string => {
	return path.resolve(__rootPath, ...pathSegments);
};

require('./src/configs/ExpressConfig')(app);
require('./src/configs/SocketIOConfig')(io);
require('./src/configs/HttpServerConfig')(httpServer, port);