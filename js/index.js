import hamburgerMenu from "./menu-hamburguesa.js";
import {eliminarItemCarrito, actualizarTotalCarrito, ocultarCarrito } from "./app.js";
import ready from "./app.js";

const d = document;

d.addEventListener("DOMContentLoaded", (e) => {
    hamburgerMenu(".panel-btn", ".panel");
});

ready();
eliminarItemCarrito();
actualizarTotalCarrito();
ocultarCarrito();


