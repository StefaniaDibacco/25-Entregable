import { _productos } from './../services/db';

interface Product {
  title: string;
  price: number;
  thumbnail: string;
}

class Productos {
  // Metodo para leer mis productos
  async leer() {
    try {
      return await _productos.find({});
    } catch (error) {
      console.log('No hay productos en el listado');
      return [];
    }
  }

  // Metodo para agregar productos
  async guardar(title: string, price: number, thumbnail: string) {
    try {
      if (typeof title !== 'string')
        throw new Error('Titulo tiene que ser string');
      if (isNaN(price)) throw new Error('Price tiene que ser un nro');
      if (typeof thumbnail !== 'string')
        throw new Error('Thumbnail tiene que ser string de url');

      const elemento: Product = {
        title: title,
        price: price,
        thumbnail: thumbnail,
      };

      // elementos.push(elemento);
      const nuevoPoducto = new _productos(elemento);
      return await nuevoPoducto.save();
    } catch (error) {
      console.log('ERROR: No se pudo agregar un producto. ' + error);
    }
  }

  // Metodo para leer uno
  async leerUno(id: any) {
    try {
      const producto = await _productos.findOne({ _id: id });
      return producto;
    } catch (error) {
      console.log('Producto no encontrado');
    }
  }

  // Metodo para actualizar productos
  async actualizar(
    id: any,
    title: string | null = null,
    price: number | null = null,
    thumbnail: string | null = null
  ) {
    try {
      if (typeof title !== 'string')
        throw new Error('Titulo tiene que ser string');
      if (typeof price !== 'number')
        throw new Error('Price tiene que ser un nro');
      if (typeof thumbnail !== 'string')
        throw new Error('Thumbnail tiene que ser string de url');

      const data = { title, price, thumbnail };
      return await _productos.updateOne({ _id: id }, { $set: data });
    } catch (error) {
      console.log(error);
    }
  }

  // Metodo para borrar un producto
  async borrarUno(id: any) {
    try {
      return await _productos.deleteOne({ _id: id });
    } catch (error) {
      console.log(`Producto no encontrado`);
    }
  }
}

export const productsPersistencia = new Productos();
