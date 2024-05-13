export default function hamburgerMenu(panelBtn, panel) {
    const d = document;

    // Función para manejar el evento de presionar la tecla "Esc"
    function handleEscKey(event) {
        if (event.key === "Escape") {
            const panelElement = d.querySelector(panel);
            const panelBtnElement = d.querySelector(panelBtn);
            if (panelElement.classList.contains("is-active")) {
                panelElement.classList.remove("is-active");
                panelBtnElement.classList.remove("is-active");
            }
        }
    }

    d.addEventListener("click", (e) => {
        if (e.target.matches(panelBtn) || e.target.matches(`${panelBtn} *`)) {
            d.querySelector(panel).classList.toggle("is-active");
            d.querySelector(panelBtn).classList.toggle("is-active");
        }
    });

    // Agregar el event listener para el evento "keydown" en el documento
    d.addEventListener("keydown", handleEscKey);
}
