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

  let botones = document.querySelectorAll(".boton-item");

  botones.forEach(function (boton) {
    boton.addEventListener("click", function () {
      alert("¡El botón ha sido clicado!");
    });
  });
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

//Funcion Para Menu//
document.querySelector(".dropbtn").addEventListener("click", toggleMenu);

function toggleMenu() {
  var menu = document.getElementById("menu");
  let body = document.querySelector("body");
  
  if (menu.style.display === "block") {
    menu.style.display = "none";
    body.style.overflow = "auto";
  } else {
    menu.style.display = "block";
    body.style.overflow = "hidden";
  }
}