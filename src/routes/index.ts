import { Router } from 'express';
import routerProductos from './productos';
import cartRouter from './carrito';
// import loginRouter from './login';

const router = Router();

router.use('/productos', routerProductos);
router.use('/cart', cartRouter); // A REALIZAR PARA LA PROXIMA ENTREGA
// router.use('/', loginRouter);

export default router;
