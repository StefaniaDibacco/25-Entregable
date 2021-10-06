import express from 'express';
import handlebars from 'express-handlebars';
import * as http from 'http';
import router from '../routes/index';
import path from 'path';
import session from 'express-session';
import cookieParser from 'cookie-parser';

const app = express();

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

app.use('/api', router);

app.get('/', (req, res) => {
  res.render('main');
});

const oneMin = 1000 * 60;

app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: 'thisismysecrctekey',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: { maxAge: oneMin },
  })
);

// creo mi configuracion para socket
const myServer = new http.Server(app);

myServer.on('error', (err) => {
  console.log('ERROR ATAJADO', err);
});

export default myServer;
