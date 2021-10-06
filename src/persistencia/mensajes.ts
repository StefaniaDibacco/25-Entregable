import { _mensajes } from './../services/db';
import { normalize, schema } from 'normalizr';
// import util from 'util';

const author = new schema.Entity('author', {}, { idAttribute: 'email' });

const msge = new schema.Entity(
  'message',
  {
    author: author,
  },
  { idAttribute: '_id' }
);

const msgesSchema = new schema.Array(msge);

interface Mensaje {
  author: {
    email: string;
    nombre: string;
    apellido: string;
    alias: string;
    edad: number;
    avatar: string;
  };
  text: string;
}

export const formatMessages = (data: Mensaje) => {
  const { author, text } = data;
  return {
    author,
    text,
  };
};

class Mensajes {
  // funcion para leer mis mensajes
  async leer() {
    try {
      const mensajes = (await _mensajes.find({})).map((m: any) => ({
        _id: m._id,
        author: m.author,
        text: m.text,
      }));
      const normalizedMessages = normalize(mensajes, msgesSchema);
      // console.log(util.inspect(normalizedMessages, true, 5, true));
      return normalizedMessages;
    } catch (error) {
      console.log('No hay mensajes en el listado');
      return [];
    }
  }

  // funcion para agregar mensajes
  async guardar(data: Mensaje) {
    try {
      const nuevoMensaje = new _mensajes(data);
      const result: any = await nuevoMensaje.save();
      const mensajes = (await _mensajes.find({ _id: result._id })).map(
        (m: any) => ({
          _id: m._id,
          author: m.author,
          text: m.text,
        })
      );

      const normalizedMessages = normalize(mensajes, msgesSchema);
      return normalizedMessages;
    } catch (error) {
      console.log('ERROR: No se pudo agregar un mensaje. ' + error);
    }
  }

  async leerUno(id: any) {
    try {
      return await _mensajes.findOne({ _id: id });
    } catch (error) {
      console.log('ERROR: No se pudo leer un mensaje. ' + error);
    }
  }

  async actualizar(id: any, data: any) {
    try {
      return await _mensajes.updateOne({ _id: id }, { $set: data });
    } catch (error) {
      console.log('ERROR: No se pudo actualizar un mensaje. ' + error);
    }
  }

  async delete(id: any) {
    try {
      return await _mensajes.deleteOne({ _id: id });
    } catch (error) {
      console.log('ERROR: No se pudo actualizar un mensaje. ' + error);
    }
  }
}

export const mensajesPersistencia = new Mensajes();
