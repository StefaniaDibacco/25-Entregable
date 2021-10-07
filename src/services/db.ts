import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/ecommerce');

const Schema = mongoose.Schema;

const mensajes = new Schema({
  author: String,
  text: String,
  time: String,
});

const productos = new Schema({
  title: String,
  price: Number,
  thumbnail: String,
  stock: Number,
});

export const _mensajes = mongoose.model('mensajes', mensajes);
export const _productos = mongoose.model('productos', productos);
