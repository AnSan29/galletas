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
const unidadesElement = document.getElementById("unidades");
const precioElement = document.getElementById("precio");

function crearTarjetasProductosInicio() {
  contenedorTarjetas.innerHTML = "";
  const productos = JSON.parse(localStorage.getItem("postres"));
  console.log(productos);
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
      <div>
        <button>-</button>
        <span class="carrito-cantidad">${producto.cantidad}</span>
        <button>+</button>
      </div>
    `;

      contenedorTarjetas.appendChild(nuevoPostre);
      nuevoPostre
        .getElementsByTagName("button")[1]
        .addEventListener("click", (e) => {
          agregarAlCarrito(producto);
          const cuentaElement =
            e.target.parentElement.getElementsByTagName("span")[0];
          cuentaElement.innerText = agregarAlCarrito(producto);
          actualizarTotales();
          actualizarNumeroCarrito();
        });

      nuevoPostre
        .getElementsByTagName("button")[0]
        .addEventListener("click", (e) => {
          restarAlCarrito(producto);
          crearTarjetasProductosInicio();
          actualizarTotales();
          actualizarNumeroCarrito();
        });
    });
  }
}

crearTarjetasProductosInicio();
actualizarTotales();

//Actualizar Total en carrito

function actualizarTotales() {
  const producto = JSON.parse(localStorage.getItem("postres"));
  let unidades = 0;
  let precio = 0;
  if (producto && producto.length > 0) {
    producto.forEach((producto) => {
      unidades += producto.cantidad;
      precio += producto.precio * producto.cantidad;
    });
    unidadesElement.innerText = unidades;
    precioElement.innerText = precio;
  }
}
