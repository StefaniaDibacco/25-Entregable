/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const { schema, denormalize } = normalizr;

const socket = io.connect('http://localhost:8080', { forceNew: true });

const formMensaje = document.getElementById('formMensajes');
const mensajesContainer = document.getElementById('mensajesContainer');

const author = new schema.Entity('author', {}, { idAttribute: 'email' });

const msge = new schema.Entity(
  'message',
  {
    author: author,
  },
  { idAttribute: '_id' }
);

const msgesSchema = new schema.Array(msge);

socket.emit('inicio-productos');
socket.emit('inicio-messages');

socket.on('producto-update', (products) => {
  products.forEach((product) => {
    addTr(product);
    console.log(product);
  });
});

const addTr = (product) => {
  const table = $('#lista');
  const trClone = $('#lista tbody tr:first');

  const nuevoTr = `<td>${product.title}</td>
        <td>${product.price}</td>
        <td>
            <img src="${product.thumbnail}" class="" alt="20px">
        </td>`;
  const tr = trClone.clone();
  tr.html(nuevoTr);
  tr.show();
  table.append(tr);
};

function render(data) {
  console.log(data);
  const html = data
    .map((mensaje, index) => {
      return `<div>
        <span class='mx-2 mensaje__email'>${mensaje.author.email}</span>
        <span class='mx-2 mensaje__time'>${mensaje.author.nombre}</span>
        <span class='mx-2 mensaje__text'>${mensaje.text}</span>
     </div>`;
    })
    .join(' ');
  document.getElementById('mensajesContainer').innerHTML += html;
}

formMensaje.addEventListener('submit', (event) => {
  event.preventDefault();
  if (email.value && mensaje.value) {
    let data = {
      author: {
        email: email.value,
        nombre: nombre.value,
        apellido: apellido.value,
        alias: alias.value,
        edad: edad.value,
        avatar: avatar.value,
      },
      text: mensaje.value,
    };
    console.log('EMITIENDO SOCKET');

    socket.emit('new-message', data);
    mensaje.value = '';
  }
});

socket.on('message-update', function (normalizedData) {
  console.log('RECIBI MENSAJE message-update', normalizedData);
  const denormalizedData = denormalize(
    normalizedData.result,
    msgesSchema,
    normalizedData.entities
  );

  render(denormalizedData);
});
