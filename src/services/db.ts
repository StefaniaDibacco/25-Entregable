import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/ecommerce');

const Schema = mongoose.Schema;

const mensajes = new Schema({
  author: {
    email: { type: String, required: true, max: 50 },
    nombre: { type: String, required: true, max: 50 },
    apellido: { type: String, required: true, max: 50 },
    alias: { type: String, required: true, max: 50 },
    edad: { type: Number, required: true },
    avatar: { type: String, required: true, max: 50 },
  },
  text: { type: String, required: true, max: 1000 },
});

const productos = new Schema({
  title: String,
  price: Number,
  thumbnail: String,
  stock: Number,
});

export const _mensajes = mongoose.model('mensajes', mensajes);
export const _productos = mongoose.model('productos', productos);
