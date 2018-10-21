import { Server, Socket } from "socket.io";

const bindWebSocketClient = require('../models/WebSocketClient');

module.exports = (ioServer: Server) => {
	ioServer.on('connection', (client: Socket) => {
		console.log(`Client ID : ${client.id} connected`);
		bindWebSocketClient(client, ioServer);
	});
};