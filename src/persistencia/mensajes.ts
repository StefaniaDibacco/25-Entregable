import moment from 'moment';
import { _mensajes } from './../services/db';

export const formatMessages = (data: { author: string; text: string }) => {
  const { author, text } = data;
  return {
    author,
    text,
    time: moment().format('DD/MM/YYYY hh:mm:ss'),
  };
};

interface Mensaje {
  author: string;
  text: string;
  time: string;
}
// const mensajes: Mensaje[] = [];

class Mensajes {
  // funcion para leer mis mensajes
  async leer() {
    try {
      // return mensajes;
      return await _mensajes.find({});
    } catch (error) {
      console.log('No hay mensajes en el listado');
      return [];
    }
  }

  // funcion para agregar mensajes
  async guardar(author: string, text: string, time: string) {
    try {
      const mensajeNuevo: Mensaje = {
        author,
        text,
        time,
      };
      const nuevoMensaje = new _mensajes(mensajeNuevo);
      return await nuevoMensaje.save();
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
