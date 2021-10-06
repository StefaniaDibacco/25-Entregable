import { Router } from 'express';
import routerProductos from './productos';
import cartRouter from './carrito';
import login from './login';

const router = Router();

router.use('/productos', routerProductos);
router.use('/cart', cartRouter); // A REALIZAR PARA LA PROXIMA ENTREGA
router.use('/auth', login);

export default router;
