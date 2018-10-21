import { Server, Socket } from "socket.io";

module.exports = (client: Socket, io: Server) => {
	client.on('chat message', (message: String) => {
		console.log(message);

		io.sockets.emit('chat message', message);
	});
};
