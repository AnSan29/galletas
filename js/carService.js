function agregarAlCarrito(producto) {
  //Reviso si el producto está en el carrito.
  let memoria = JSON.parse(localStorage.getItem("postres"));
  console.log(memoria);
  let cuenta = 0;
  if (!memoria) {
    const nuevoProducto = getNuevoProductoParaMemoria(producto);
    localStorage.setItem("postres", JSON.stringify([nuevoProducto]));
    actualizarNumeroCarrito();
    cuenta = 1;
  } else {
    //Si hay localstorage me fijo si el artículo ya está ahí
    const indiceProducto = memoria.findIndex(
      (postres) => postres.id === producto.id
    );
    const nuevaMemoria = memoria;
    //Si el producto no está en el carrito lo agrego
    if (indiceProducto === -1) {
      const nuevoProducto = getNuevoProductoParaMemoria(producto);
      nuevaMemoria.push(nuevoProducto);
      cuenta = 1;
    } else {
      //Si el producto está en el carrito le agrego 1 a la cantidad.
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
    (postres) => postres.id === producto.id
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

//Funcion para actualziar el numero del carrito
const cuentaCarritoElement = document.getElementById("cuenta-carrito");
function actualizarNumeroCarrito() {
  const memoria = JSON.parse(localStorage.getItem("postres"));
  const cuenta = memoria.reduce((acum, current) => acum + current.cantidad, 0);
  cuentaCarritoElement.innerText = cuenta;
}
actualizarNumeroCarrito();
