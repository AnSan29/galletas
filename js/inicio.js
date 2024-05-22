//Funcion Para whatsapp//
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

  const sliderButton = document.getElementById("sliderButton");
  if (sliderButton) {
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
});

//Funcion Para Dezlisar//
document.addEventListener("DOMContentLoaded", () => {
  const imagesContainer = document.querySelector(".carousel-images");
  const images = document.querySelectorAll(".carousel-image");
  let currentIndex = 0;

  function showNextImage() {
    images[currentIndex].classList.remove("active");
    currentIndex = (currentIndex + 1) % images.length;
    images[currentIndex].classList.add("active");
    imagesContainer.style.transform = `translateX(-${currentIndex * 50}%)`;
  }

  setInterval(showNextImage, 8000);
});

//Funcion Para Menu
document.querySelector(".dropbtn").addEventListener("click", () => {
  const menu = document.getElementById("menu");
  menu.style.display = menu.style.display === "none" ? "block" : "none";
});

//Funcion Para carrito
const contenedorTarjetas = document.getElementById("productos-container");

function crearTarjetasProductosInicio(productos) {
  productos.forEach((producto) => {
    const nuevoPostre = document.createElement("div");
    nuevoPostre.classList = "tarjeta-producto";
    nuevoPostre.innerHTML = `
      <img src="./img/${producto.img}.jpg">
      <h3>${producto.name}</h3>
      <span>${producto.description}</span>
      <p>$${producto.price}</p>
      <br>
      <button class="agregar-carrito">Agregar al carrito</button>
    `;
    contenedorTarjetas.appendChild(nuevoPostre);

    nuevoPostre
      .getElementsByTagName("button")[0]
      .addEventListener("click", () => agregarAlCarrito(producto));
    nuevoPostre
      .getElementsByTagName("button")[0]
      .addEventListener("click", () => mostrarModal());
  });
}

crearTarjetasProductosInicio(postres);

function mostrarModal() {
  const modal = document.getElementById("modal");
  const closeBtn = modal.querySelector(".close");

  modal.style.display = "block";

  closeBtn.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
}
