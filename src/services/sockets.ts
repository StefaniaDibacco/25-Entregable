import { productsPersistencia } from '../persistencia/productos';
import { formatMessages, mensajesPersistencia } from '../persistencia/mensajes';

export const init = (io: any) => {
  io.on('connection', (socket: any) => {
    console.log('conectado');
    socket.on('producto-nuevo', async (product: any) => {
      const { title, price, thumbnail } = product;
      console.log('producto nuevo', product);
      const resultado = await productsPersistencia.guardar(
        title,
        price,
        thumbnail
      );
      console.log('guardé producto nuevo', resultado);
      if (resultado) {
        io.emit('producto-update', [product]);
      }
    });
    socket.on('inicio-productos', async () => {
      console.log('inicio lista de productos productos');
      const productos = await productsPersistencia.leer();
      if (productos.length > 0) {
        socket.emit('producto-update', productos);
      }
    });

    socket.on('inicio-messages', async () => {
      console.log('ME LLEGO DATA inicio de messages');
      const mensajes = await mensajesPersistencia.leer();

      socket.emit('message-update', mensajes);
    });

    socket.on('new-message', async (data: any) => {
      const formatData = formatMessages(data);
      await mensajesPersistencia.guardar(formatData);
      io.emit('message-update', [formatData]);
    });
  });

  return io;
};
