//Se pretende agregar funcionalidad de sesión de usuario. Para tener la capcidad de enviar al cliente recordatorio de pago, así como agregar eventualmente una base de datos en MONGO.


// Variables
const carrito = document.querySelector('#carrito');
const listaPlayeras = document.querySelector('#lista-playeras');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];

// Listeners
cargarEventListeners();

function cargarEventListeners() {
     // Dispara cuando se presiona "Agregar Carrito"
     listaPlayeras.addEventListener('click', agregarPlayera);

     // Cuando se elimina una playera del carrito
     carrito.addEventListener('click', eliminarPlayera);

     // Al Vaciar el carrito
     vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

}




// Funciones
// Función que añade la playera al carrito
function agregarPlayera(e) {
     e.preventDefault();
     // Delegation para agregar-carrito
     if (e.target.classList.contains('agregar-carrito')) {
          const Playera = e.target.parentElement.parentElement;
          // Enviamos la playera seleccionada para tomar sus datos
          leerDatosPlayera(Playera);
     }
}

// Lee los datos del curso
function leerDatosPlayera(Playera) {
     const infoPlayera = {
          imagen: Playera.querySelector('img').src,
          titulo: Playera.querySelector('h4').textContent,
          precio: Playera.querySelector('.precio span').textContent,
          id: Playera.querySelector('a').getAttribute('data-id'),
          cantidad: 1
     }


     if (articulosCarrito.some(Playera => Playera.id === infoPlayera.id)) {
          const playeras = articulosCarrito.map(Playera => {
               if (Playera.id === infoPlayera.id) {
                    Playera.cantidad++;
                    return Playera;
               } else {
                    return Playera;
               }
          })
          articulosCarrito = [...playeras];
     } else {
          articulosCarrito = [...articulosCarrito, infoPlayera];
     }

     // console.log(articulosCarrito)



     // console.log(articulosCarrito)
     carritoHTML();
}

// Elimina el curso del carrito en el DOM
function eliminarPlayera(e) {
     e.preventDefault();
     if(e.target.classList.contains('borrar-playera') ) {
          // e.target.parentElement.parentElement.remove();
          const PlayeraId = e.target.getAttribute('data-id')
          
          // Eliminar del arreglo del carrito
          articulosCarrito = articulosCarrito.filter(Playera => Playera.id !== PlayeraId);

          carritoHTML();
     }
}


// Muestra el curso seleccionado en el Carrito
function carritoHTML() {

     vaciarCarrito();

     articulosCarrito.forEach(Playera => {
          const row = document.createElement('tr');
          row.innerHTML = `
               <td>  
                    <img src="${Playera.imagen}" width=100>
               </td>
               <td>${Playera.titulo}</td>
               <td>${Playera.precio}</td>
               <td>${Playera.cantidad} </td>
               <td>
                    <a href="#" class="borrar-playera" data-id="${Playera.id}">X</a>
               </td>
          `;
          contenedorCarrito.appendChild(row);
     });

}
// Elimina los cursos del carrito en el DOM
function vaciarCarrito() {
     // forma lenta
     // contenedorCarrito.innerHTML = '';


     // forma rapida (recomendada)
     while(contenedorCarrito.firstChild) {
          contenedorCarrito.removeChild(contenedorCarrito.firstChild);
      }
}
