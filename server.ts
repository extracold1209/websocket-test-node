const http = require('http');
const path = require('path');

const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const io = require('socket.io')(http);

const indexRouter = require('./src/routes/index');

const port = process.env.PORT || '3000';

/*
 * Express region
 */
app.set('port', port);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use('/', indexRouter);

/*
 * Http region
 */
const server = http.createServer(app);
server.listen(port, () => {
	console.log(`Server listen successfully on ${port}`);
});

server.on('error', (error) => {
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

/*
 * Socket.io region
 */
io.on('connection', (client) => {
	console.log(`hello ${client}`);
});