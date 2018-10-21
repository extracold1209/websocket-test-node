import { Socket } from "socket.io";


const express = require('express');
const app = express();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer);

const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./src/routes/index');

const port = process.env.PORT || '8080';

/*
 * Express region
 */
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);

/*
 * Socket.io region
 */
io.on('connection', (client: Socket) => {
	console.log('connected');

	client.on('chat message', (message: String) => {
		console.log(message);
		client.emit('chat message', message);
	});
});

/*
 * Http region
 */
httpServer.listen(port, () => {
	console.log(`Server listen successfully on ${port}`);
});

httpServer.on('error', (error) => {
	if (error.syscall !== 'listen') {
		throw error;
	}

	// handle specific listen errors with friendly messages
	switch (error.code) {
		case 'EACCES':
			console.error('requires elevated privileges');
			process.exit(1);
			break;
		case 'EADDRINUSE':
			console.error('port is already in use');
			process.exit(1);
			break;
		default:
			throw error;
	}
});