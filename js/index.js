document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');
    const whatsappButton = document.getElementById('whatsappButton');
    if (whatsappButton) {
        console.log('Button found');
        whatsappButton.addEventListener('click', function() {
            console.log('Button clicked');
            const phoneNumber = '573028658884'; // Reemplaza con tu número de WhatsApp en formato internacional
            const message = 'Hola TortasMyJ estoy interesad@ en realizar un pedido.'; // Mensaje predefinido opcional
            const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
            console.log('Redirecting to', url);
            window.location.href = url;
        });
    } else {
        console.error('Button not found');
    }

    let botones = document.querySelectorAll('.boton-item');

    botones.forEach(function(boton) {
        boton.addEventListener('click', function() {
            alert('¡El botón ha sido clicado!');
        });
    });
});



