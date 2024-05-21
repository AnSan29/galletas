function agregarAlCarrito(producto) {
  const memoria = JSON.parse(localStorage.getItem("postres"));
  console.log(memoria);
  let cuenta = 0;
  if (!memoria) {
    const nuevoProducto = getNuevoProductoParaMemoria(producto);
    localStorage.setItem("postres", JSON.stringify([nuevoProducto]));
    cuenta = 1;
  } else {
    const indiceProducto = memoria.findIndex(
      (postre) => postre.id === producto.id
    );
    console.log(indiceProducto);
    const nuevaMemoria = memoria;
    if (indiceProducto === -1) {
      nuevaMemoria.push(getNuevoProductoParaMemoria(producto));
      cuenta = 1;
    } else {
      nuevaMemoria[indiceProducto].cantidad++;
      cuenta = nuevaMemoria[indiceProducto].cantidad;
    }
    localStorage.setItem("postres", JSON.stringify(nuevaMemoria));
  }
  actualizarNumeroCarrito();
  return cuenta;
}
//Restar carrito en carrito
function restarAlCarrito(producto) {
  const memoria = JSON.parse(localStorage.getItem("postres"));
  const indiceProducto = memoria.findIndex(
    (postre) => postre.id === producto.id
  );
  if (memoria[indiceProducto].cantidad === 1) {
    memoria.splice(indiceProducto, 1);
    localStorage.setItem("postres", JSON.stringify(memoria));
  } else {
    memoria[indiceProducto].cantidad--;
  }
  localStorage.setItem("postres", JSON.stringify(memoria));
  actualizarNumeroCarrito();
}

//Funcion para tomar el producto y le agrega la cantidad 1 y lo devuelve
function getNuevoProductoParaMemoria(producto) {
  const nuevoProducto = producto;
  nuevoProducto.cantidad = 1;
  return nuevoProducto;
}
//Funcion para actualizar numero en el carrito
const cuentaCarritoElement = document.getElementById("cuenta-carrito");

function actualizarNumeroCarrito() {
  const memoria = JSON.parse(localStorage.getItem("postres")) || [];
  const cuenta = memoria.reduce((acum, current) => acum + current.cantidad, 0);
  cuentaCarritoElement.innerText = cuenta;
}
actualizarNumeroCarrito();
