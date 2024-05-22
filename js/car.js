document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully loaded and parsed");
  const whatsappButton = document.getElementById("whatsappButton");
  if (whatsappButton) {
    console.log("Button found");
    whatsappButton.addEventListener("click", function () {
      console.log("Button clicked");
      const phoneNumber = "573028658884"; // Reemplaza con tu número de WhatsApp en formato internacional
      const message = "Hola TortasMyJ estoy interesad@ en realizar un pedido."; // Mensaje predefinido opcional
      const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
        message
      )}`;
      console.log("Redirecting to", url);
      window.location.href = url;
    });
  } else {
    console.error("Button not found");
  }
});

//Funcion Para Menu//
document.querySelector(".dropbtn").addEventListener("click", toggleMenu);
let body = document.querySelector("body");

function toggleMenu() {
  var menu = document.getElementById("menu");
  if (menu.style.display === "block") {
    menu.style.display = "none";
    body.style.overflow = "auto";
  } else {
    menu.style.display = "block";
    body.style.overflow = "hidden";
  }
}

//Funcion Para carrito
const contenedorTarjetas = document.getElementById("productos-container");
const cantidadElement = document.getElementById("cantidad");
const precioElement = document.getElementById("precio");
const carritoVacioElement = document.getElementById("CarritoVacio");
const totalesElement = document.getElementById("totales");
const reiniciarCarritoElement = document.getElementById("reiniciar");

function crearTarjetasProductosInicio() {
  contenedorTarjetas.innerHTML = "";
  const productos = JSON.parse(localStorage.getItem("postres"));
  if (productos && productos.length > 0) {
    productos.forEach((producto) => {
      const nuevoPostre = document.createElement("div");
      nuevoPostre.classList = "tarjeta-producto";
      nuevoPostre.innerHTML = `
      <img src="${producto.img}">
      <h3>${producto.name}</h3>
      <br>
      <p>$${producto.price}</p>
      <br>
      <div class="carrito-cantidad-contenedor">
        <button class="menos">-</button>
        <span class="carrito-cantidad">${producto.cantidad}</span>
        <button class="mas">+</button>
      </div>
    `;

      contenedorTarjetas.appendChild(nuevoPostre);
      nuevoPostre
        .getElementsByTagName("button")[1]
        .addEventListener("click", (e) => {
          const cuentaElement =
            e.target.parentElement.getElementsByTagName("span")[0];
          cuentaElement.innerText = agregarAlCarrito(producto);
          actualizarTotales();
        });

      nuevoPostre
        .getElementsByTagName("button")[0]
        .addEventListener("click", (e) => {
          restarAlCarrito(producto);
          crearTarjetasProductosInicio();
          actualizarTotales();
        });
    });
  }
}

crearTarjetasProductosInicio();
actualizarTotales();

//Actualizar precio y cantidad
function actualizarTotales() {
  const productos = JSON.parse(localStorage.getItem("postres"));
  let cantidad = 0;
  let precio = 0;
  if (productos && productos.length > 0) {
    productos.forEach((producto) => {
      cantidad += producto.cantidad;
      precio += producto.price * producto.cantidad;
    });
    cantidadElement.innerText = cantidad;
    precioElement.innerText = `$${precio}`;
  }
  revisarMensajeVacio();
}
//Se me pone vacio
function revisarMensajeVacio() {
  const productos = JSON.parse(localStorage.getItem("postres"));
  console.log(productos, productos == true);
  carritoVacioElement.classList.toggle(
    "escondido",
    productos && productos.length > 0
  );
  totalesElement.classList.toggle(
    "escondido",
    !(productos && productos.length > 0)
  );
}
revisarMensajeVacio();

reiniciarCarritoElement.addEventListener("click", reiniciarCarrito);
function reiniciarCarrito() {
  localStorage.removeItem("postres");
  revisarMensajeVacio();
  actualizarTotales();
  crearTarjetasProductosInicio();
}

//Funcion para comprar con whatsapp CARRITO
const sliderButton = document.getElementById("comprarwatsapp");
if (comprarwatsapp) {
  console.log("Button found");
  sliderButton.addEventListener("click", function () {
    console.log("Button clicked");
    const phoneNumber = "573028658884"; // Reemplaza con tu número de WhatsApp en formato internacional
    const message =
      "Hola TortasMyJ estoy interesad@ en perzonalizar un pedido."; // Mensaje predefinido opcional
    const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
      message
    )}`;
    console.log("Redirecting to", url);
    window.location.href = url;
  });
} else {
  console.error("Button not found");
}
