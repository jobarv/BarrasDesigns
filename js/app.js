//Se pretende agregar funcionalidad de sesión de usuario. Para tener la capcidad de enviar al cliente recordatorio de pago, así como agregar eventualmente una base de datos en MONGO.
function cambiarModo() {
     var cuerpoweb = document.body;
     cuerpoweb.classList.toggle("oscuro");
   }
   

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

     // Muestra los productos en localStorage 

     document.addEventListener('DOMContentLoaded', ()=> {
          articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
          carritoHTML();
     })

     // Al Vaciar el carrito
     vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

}

// Funciones
// Función que añade la playera al carrito
function agregarPlayera(e) {

     //Avisa que se agregó una playera al carrito usando sweet alert
     Swal.fire({
          icon: "success",
          title: "¡Excelente Selección!",
          text: "La playera ha sido agregada al carrito con éxito"
      });
      
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

     // Agregar el carrito de compras al Storage 

     sincronizarStorage();
}

function sincronizarStorage() {
     localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
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

// Fetch API desde un JSON (Array)
//La idea es que el cliente dé click en el botón y se otorqué un descuento sorpresa, para el ejemplo se está mandando llamar la información desde el JSON en la carpeta "data"

const cargarJSONBtn = document.querySelector('#cargarJSON');
cargarJSONBtn.addEventListener('click', obtenerDatos);


function obtenerDatos() {
    fetch('../data/regalo.json') 
        .then( respuesta => {
            return respuesta.json()
        }) 
        .then(resultado => {
            mostrarHTML(resultado);
            console.log(resultado)
        })
}

function mostrarHTML({nombreUsuario,  dto, vencimiento, codigoValido}){
    const contenido = document.querySelector('#codigo');

    contenido.innerHTML = `
    <div class="resultado">
        <p>Nombre de Usuario: ${nombreUsuario} </p>
        
        <p>Descuento Otorgado: ${dto} </p>
        
        <p>Vigencia: ${vencimiento} </p>
        
        <p>Código de Descuento: ${codigoValido} </p>
        </div>
    `
    
}