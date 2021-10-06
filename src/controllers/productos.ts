import { Request, Response, NextFunction } from 'express';
import { productsPersistencia } from '../persistencia/productos';

class Producto {
  async checkAddProducts(req: Request, res: Response, next: NextFunction) {
    const { title, price } = req.body;

    if (!title || !price || typeof title !== 'string' || isNaN(price)) {
      return res.status(400).json({
        msg: 'Campos del body invalidos',
      });
    }

    next();
  }

  async checkProductExists(req: Request, res: Response, next: NextFunction) {
    if (req.params.id) {
      const id = req.params.id;

      const producto = await productsPersistencia.leerUno(id);

      if (!producto) {
        return res.status(404).json({
          msg: 'producto not found',
        });
      }
    }
    next();
  }

  async generar(req: Request, res: Response) {
    const resultado = [];
    const cant = req.query.cant ? Number(req.query.cant) : 10;

    for (let i = 0; i < cant; i++) {
      const prodNew = await productsPersistencia.post();
      resultado.push(prodNew);
    }

    res.json({
      result: 'ok',
      data: resultado,
    });
  }

  async getProducts(req: Request, res: Response) {
    const id = Number(req.params.id);

    const producto = id
      ? await productsPersistencia.leerUno(id)
      : await productsPersistencia.leer();

    res.json({
      data: producto,
    });
  }

  async addProducts(req: Request, res: Response) {
    const { title, price, thumbnail } = req.body;
    const newItem = await productsPersistencia.guardar(title, price, thumbnail);

    res.json({
      msg: 'producto agregado con exito',
      data: newItem,
    });
  }

  async updateProducts(req: Request, res: Response) {
    const id = Number(req.params.id);
    const { title, price, thumbnail } = req.body;
    const newItem = await productsPersistencia.actualizar(
      id,
      title,
      price,
      thumbnail
    );
    res.json({
      data: newItem,
      msg: 'actualizando producto',
    });
  }

  async deleteProducts(req: Request, res: Response) {
    const id = req.params.id;
    await productsPersistencia.borrarUno(id);
    res.json({
      msg: 'producto borrado',
    });
  }
}

export const productController = new Producto();
