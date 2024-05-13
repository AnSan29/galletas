const d = document;


// variable que mantiene el estado visible del carrito
let carritoVIsible = false;

// Esperamos que todos los elementos de la paina se carguen para continuar con el script

if(d.readyState == 'loading' ){
    d.addEventListener("DOMContentLoaded", ready)
}else{
    ready();
}

export default function ready(){
    //Agregamos funcionalidad a los botones eliminar del carrito
    let botonesEliminarItem = d.getElementsByClassName("btn-eliminar");
    for(let i=0; i < botonesEliminarItem.length;i++){
        let button = botonesEliminarItem[i];
        button.addEventListener("click", eliminarItemCarrito);
    }

    //Agrego funcionalidad l boton sumar cantidad
    let botonesSumarCantidad = d.getElementsByClassName("sumar-cantidad");
    for(let i=0; i < botonesSumarCantidad.length; i++){
        let button = botonesSumarCantidad[i];
        button.addEventListener("click", sumarCantidad);
    }
    //Agrego funcionalidad l boton restar cantidad
    let botonesRestarCantidad = d.getElementsByClassName("restar-cantidad");
    for(let i=0; i < botonesRestarCantidad.length; i++){
        let button = botonesRestarCantidad[i];
        button.addEventListener("click", restarCantidad);
    }

    //Agrego funcionalidad a los botones "agregar al carrito"
    let botonesAgregarAlCarrito = d.getElementsByClassName("boton-item");
    for(let i=0; i<botonesAgregarAlCarrito.length; i++){
        let button = botonesAgregarAlCarrito[i];
        button.addEventListener("click", agregarAlCarritoClicked);
    }

    //Agregamos funcionalidad al boton pagar
    d.getElementsByClassName("btn-pagar")[0].addEventListener("click", pagarClicked)
}

//elimino el item seleccionado del carrito
export function eliminarItemCarrito(event){
    let buttonCliked = event.target;
    buttonCliked.parentElement.remove();

    //Actualizamos el total del carrito una vez hemos eliminado un item
    actualizarTotalCarrito();

    //la siguiente funcion controla si hay elementos en el carrito una vez que se eliminó
    //si no hay, debo ocultar el carrito
    ocultarCarrito();
}

//Actualizamos el total del carrito
export function actualizarTotalCarrito(){
    // seleccionamos el contenedor carrito
    let carritoContenedor = d.getElementsByClassName("carrito")[0];
    let carritoItems = carritoContenedor.getElementsByClassName("carrito-item");
    let total = 0;

    // recorremos cada elemento del carrito para actualizar el total
    for(let i=0; i < carritoItems.length; i++){
        let item = carritoItems[i];
        let precioElemento = item.getElementsByClassName("carrito-item-precio")[0];
        // quitamos el simbolo peso y el punto de milesimo
        let precio = parseFloat(precioElemento.innerText.replace("$","").replace(".",""));
        let cantidadItem = item.getElementsByClassName("carrito-item-cantidad")[0];
        let cantidad = cantidadItem.value;
        total = total + (precio * cantidad);
    }

    // Si hay más de un elemento en el carrito, multiplicamos el total por la cantidad total de elementos
    if (carritoItems.length > 1) {
        total = total * carritoItems.length;
    }

    total = Math.round(total*100)/100;
    d.getElementsByClassName("carrito-precio-total")[0].innerText = "$" + total.toLocaleString("es") + ".00";
}

export function ocultarCarrito(){
    let carritoItems = d.getElementsByClassName("carrito-items")[0];
    if(carritoItems.childElementCount==0 ){
        let carrito = d.getElementsByClassName("carrito")[0];
        carrito.style.marginRigth = "-100%";
        carrito.style.opacity = "0";
        carritoVIsible = false;

        //ahora se maximiza el contenedor de los elementos
        let items = d.getElementsByClassName("contenedor-items")[0];
        items.style.width = "100%";
    }
}

// Aumento en uno la cantidad del elemento seleccionado
function sumarCantidad(event){
    let buttonCliked = event.target;
    let selector = buttonCliked.parentElement;
    let cantidadActual = selector.getElementsByClassName("carrito-item-cantidad")[0].value;
    console.log(cantidadActual);
    cantidadActual++;
    selector.getElementsByClassName("carrito-item-cantidad")[0].value = cantidadActual;
    //Actualizamos el total
    actualizarTotalCarrito();
}

function restarCantidad(event){
    let buttonCliked = event.target;
    let selector = buttonCliked.parentElement;
    let cantidadActual = selector.getElementsByClassName("carrito-item-cantidad")[0].value;
    console.log(cantidadActual);
    cantidadActual--;

    //controlamos que no sea menor que 1
    if(cantidadActual>=1){
        selector.getElementsByClassName("carrito-item-cantidad")[0].value = cantidadActual;
        //Actualizamos el total
        actualizarTotalCarrito();
    }
}

function agregarAlCarritoClicked(event){
    let button = event.target;
    let item = button.parentElement;
    let titulo = item.getElementsByClassName("titulo-item")[0].innerText;
    console.log(titulo);
    let precio = item.getElementsByClassName("precio-item")[0].innerText;
    let imagenSrc = item.getElementsByClassName("img-item")[0].src;
    console.log(imagenSrc);

    //la siguiente funcion agrega el elemento al carrito. le mando por parámetros los valores
    agregarItemAlCarrito(titulo, precio, imagenSrc);

    //hacemos visible el carrito cuando agrega por primera vez
    hacerVisibleCarrito();
}

function agregarItemAlCarrito(titulo, precio, imagenSrc){
    let item = d.createElement("div");
    item.classList.add = "item";
    let itemsCarrito = d.getElementsByClassName("carrito-items")[0];

    //vamos a controlar que el item que esta ingresando no se encuentra ya en el carrito.
    let nombresItemsCarrito = itemsCarrito.getElementsByClassName("carrito-item-titulo");
    for(let i=0; i < nombresItemsCarrito.length; i++){
        if(nombresItemsCarrito[i].innerText==titulo){
            alert("El item ya se encuentra en el carrito");
            return;
        }
    }

    let itemsCarritoContenido = `
    <div class="carrito-item">
        <img src="${imagenSrc}" alt="${titulo}" width="88px">
        <div class="carrito-item-detalles">
            <span class="carrito-item-titulo">${titulo}</span>
            <div class="selector-cantidad">
                <i class="fa-solid fa-minus restar-cantidad"></i>
                <input type="text" value="1" class="carrito-item-cantidad" disabled>
                <i class="fa-solid fa-plus sumar-cantidad"></i>
            </div>
            <span class="carrito-item-precio">${precio}</span>
        </div>
        <span class="btn-eliminar">
            <i class="fa-solid fa-trash"></i>
        </span>
    </div>
    `;

    item.innerHTML = itemsCarritoContenido;
    itemsCarrito.append(item);

    //Agregamos la funcionalidad eliminar de nuevo item
    item.getElementsByClassName("btn-eliminar")[0].addEventListener("click", eliminarItemCarrito);
    
    //Agregamos la funcionalidad de sumar del nuevo item
    let botonSumarCantidad = item.getElementsByClassName("sumar-cantidad")[0];
    botonSumarCantidad.addEventListener("click", sumarCantidad);

    //Agregamos la funcionalidad de restar del nuevo item
    let botonRestarCantidad = item.getElementsByClassName("restar-cantidad")[0];
    botonRestarCantidad.addEventListener("click", restarCantidad);

    //Actualizamos el total solo con el precio del nuevo item
    let precioNuevoItem = parseFloat(precio.replace("$", "").replace(".", ""));
    let totalAnterior = parseFloat(d.getElementsByClassName("carrito-precio-total")[0].innerText.replace("$", "").replace(".", ""));
    let totalActualizado = totalAnterior + precioNuevoItem;
    d.getElementsByClassName("carrito-precio-total")[0].innerText = "$" + totalActualizado.toLocaleString("es") + ".00";
}

function pagarClicked(event){
    alert("gracias por su compra")
    //Elimino todos los elementos del carrito
    let carritoItems = d.getElementsByClassName("carrito-items")[0];
    while(carritoItems.hasChildNodes()){
        carritoItems.removeChild(carritoItems.firstChild);
    }
    actualizarTotalCarrito();

    //funcion que oculta el carrito
    ocultarCarrito();
}

function hacerVisibleCarrito(){
    carritoVIsible = true;
    let carrito = d.getElementsByClassName("carrito")[0];
    carrito.style.right = "20px"; // Ajusta la distancia desde el borde derecho según tu preferencia
    carrito.style.top = "20px"; // Ajusta la distancia desde la parte superior según tu preferencia
    carrito.style.opacity = "1";
}