import { Request, Response, Router } from 'express';

const router = Router();

const logged = {
  islogged: false,
  isTimedOut: false,
  isDestroyed: false,
  nombre: '',
};

router.get('/', (req: Request, res: Response) => {
  console.log('estoy en get');
  const session: any = req.session;
  if (!session.nombre && logged.islogged) {
    logged.islogged = false;
    logged.isTimedOut = true;
    res.render('main', logged);
    logged.isTimedOut = false;
    logged.nombre = '';
  }
  if (logged.isDestroyed) {
    res.render('main', logged);
    logged.nombre = ``;
    logged.isDestroyed = false;
  } else {
    res.render('main', logged);
  }
});

router.post('/login', (req: any, res: Response) => {
  if (req.body.nombre) {
    const session: any = req.session;
    session.nombre = req.body.nombre;
    logged.nombre = req.body.nombre;
    logged.islogged = true;
  }
  res.redirect('/');
});

router.post('/logout', (req: Request, res: Response) => {
  const session: any = req.session;
  session.destroy();
  logged.islogged = false;
  logged.isDestroyed = true;
  res.redirect('/');
});

export default router;
