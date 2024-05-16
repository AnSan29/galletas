let contadorCarrito = 0;

function agregarAlCarrito() {
  contadorCarrito++;
  console.log("Contador actualizado:", contadorCarrito);
  actualizarContadorCarrito();
}

function actualizarContadorCarrito() {
  const contadorElemento = document.getElementById("carrito-contador");
  contadorElemento.innerHTML = `<a class="lista_link" href="/html/Principal/Carrito/index.html"> <i class="fas fa-shopping-cart"></i><span class="contador">${contadorCarrito}</span></a>`;
}
