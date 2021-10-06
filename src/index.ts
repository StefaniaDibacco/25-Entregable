import { init } from './services/sockets';
import myServer from './services/server';
import { Server } from 'socket.io';

const io = new Server(myServer);
const puerto = process.env.PORT || 8080;

init(io);

myServer.listen(puerto, () => console.log(`Server up puerto ${puerto}`));
