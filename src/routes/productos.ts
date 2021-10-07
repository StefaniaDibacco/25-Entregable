import { Router } from 'express';
import { productController } from '../controllers/productos';
import { checkAdmin } from '../middleware/admin';

const router = Router();

router.get('/', productController.getProducts);

router.get(
  '/listar/:id?',
  productController.checkProductExists,
  productController.getProducts
);

router.post(
  '/agregar',
  [checkAdmin, productController.checkAddProducts],
  productController.addProducts
);

router.put(
  '/actualizar/:id',
  [checkAdmin, productController.checkProductExists],
  productController.updateProducts
);

router.delete(
  '/borrar/:id',
  [checkAdmin, productController.checkProductExists],
  productController.deleteProducts
);

export default router;
