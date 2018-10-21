import { Server } from "http";
import ErrnoException = NodeJS.ErrnoException;

module.exports = (http: Server, port: string) => {
	http.listen(port, () => {
		console.log(`Server started on port ${port}`);
	});

	http.on('error', (error: ErrnoException) => {
		if (error.syscall !== 'listen') {
			throw error;
		}

		switch (error.code) {
			case 'EACCES':
				console.error('access requires elevated privileges');
				process.exit(1);
				break;
			case 'EADDRINUSE':
				console.error(`Port ${port} already in use`);
				process.exit(1);
				break;
			default:
				throw error;
		}
	});
};