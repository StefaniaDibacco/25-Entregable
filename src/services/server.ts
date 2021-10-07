import express, { Request, Response } from 'express';
import handlebars from 'express-handlebars';
import * as http from 'http';
import routerProductos from '../routes/productos';
import path from 'path';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const publicFolderPath = path.resolve(__dirname, '../../public');
app.use(express.static(publicFolderPath));

// configuracion de hbs
const layoutDirPath = path.resolve(__dirname, '../../views/layouts');
const defaultLayerPth = path.resolve(
  __dirname,
  '../../views/layouts/index.hbs'
);
const partialDirPath = path.resolve(__dirname, '../../views/partials');

app.set('view engine', 'hbs');
app.engine(
  'hbs',
  handlebars({
    layoutsDir: layoutDirPath,
    defaultLayout: defaultLayerPth,
    extname: 'hbs',
    partialsDir: partialDirPath,
  })
);

app.use('/api/productos', routerProductos);

app.use(express.json());

const StoreOptions = {
  store: MongoStore.create({
    mongoUrl:
      'mongodb+srv://stefanidb:4diasmas@cluster0.7tqvz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  }),
  secret: 'thisismysecrctekey',
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: { maxAge: 1000 * 60 },
};

app.use(cookieParser());
app.use(session(StoreOptions));

// eslint-disable-next-line prefer-const
let logged = {
  islogged: false,
  isTimedOut: false,
  isDestroyed: false,
  nombre: '',
};

app.get('/', (req: any, res) => {
  console.log('estoy en get');
  if (req.session) {
    if (!req.session.nombre && logged.islogged) {
      logged.islogged = false;
      logged.isTimedOut = true;
      res.render('main', logged);
      logged.isTimedOut = false;
      logged.nombre = '';
    }
  }
  if (logged.isDestroyed) {
    res.render('main', logged);
    logged.nombre = ``;
    logged.isDestroyed = false;
  } else {
    res.render('main', logged);
  }
});

app.post('/login', (req: any, res: Response) => {
  if (req.body.nombre) {
    const session: any = req.session;
    session.nombre = req.body.nombre;
    logged.nombre = req.body.nombre;
    logged.islogged = true;
  }
  res.redirect('/');
});

app.post('/logout', (req: Request, res: Response) => {
  const session: any = req.session;
  session.destroy();
  logged.islogged = false;
  logged.isDestroyed = true;
  res.redirect('/');
});

// creo mi configuracion para socket
const myServer = new http.Server(app);

myServer.on('error', (err) => {
  console.log('ERROR ATAJADO', err);
});

export default myServer;
