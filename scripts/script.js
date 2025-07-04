
document.addEventListener('DOMContentLoaded', function() {

   // Lista de imágenes para el slideshow
    const images = [
      'img/slideshow/ccr1.jpeg',
      'img/slideshow/ccr2.jpeg' // añade más imágenes según necesites
    ];
    
    let currentIndex = 0;
    const bgElement = document.querySelector('.bgimg-1');
    
    // Función para cambiar la imagen
    function changeBackground() {
      currentIndex = (currentIndex + 1) % images.length;
      bgElement.style.backgroundImage = `url(${images[currentIndex]})`;
    }
    
    // Cambiar la primera imagen inmediatamente
    bgElement.style.backgroundImage = `url(${images[currentIndex]})`;
    
    // Configurar el intervalo para cambiar imágenes (cada 5 segundos)
    setInterval(changeBackground, 5000);

    
    // Navbar scroll effect
    document.addEventListener("scroll", function () {
        const navbar = document.querySelector(".navbar");
        if (window.scrollY > 0) {
            navbar.classList.add("scrolled-navbar");
        } else {
            navbar.classList.remove("scrolled-navbar");
        }
    });

    // Flash notification functionality
    const historiaButton = document.querySelector('#historiaBtn');
    if (historiaButton) {
        historiaButton.addEventListener('click', function(e) {
            e.preventDefault();
            const toastElement = document.getElementById('flashNotification');
            if (toastElement) {
                const toast = new bootstrap.Toast(toastElement, {
                    delay: 2000
                });
                toast.show();
            }
        });
    }

    // Form submission
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener("submit", (e) => {
            const loader = document.querySelector('.contact-form-loader');
            const response = document.querySelector('.contact-form-response');
            const formButton = document.querySelector("#formButton");
            
            if (loader) loader.classList.remove("none");
            if (formButton) formButton.setAttribute("disabled", "");

            setTimeout(() => {
                if (loader) loader.classList.add("none");
                if (response) response.classList.remove("none");
                form.reset();
                if (formButton) formButton.removeAttribute("disabled");

                setTimeout(() => {
                    if (response) response.classList.add("none");
                }, 5000);
            }, 3000);
        });
    }

    // Links redirect
    if (window.location.pathname === '/links') {
        window.location.replace('/linktree.html');
    }

    // Función para abrir imagen en modal
    window.openImageModal = function(imgSrc) {
        const modalImage = document.getElementById('modalImage');
        modalImage.src = imgSrc;
        const imageModal = new bootstrap.Modal(document.getElementById('imageModal'));
        
        // Agregar evento para cerrar al hacer clic fuera de la imagen
        const modalBody = document.querySelector('.modal-body');
        modalBody.addEventListener('click', function(e) {
            if (e.target === modalBody) {
                imageModal.hide();
            }
        });
        
        imageModal.show();
    }

    // Función para cargar transcripciones
    for (let i = 1; i <= 13; i++) {
        const transcripcionDiv = document.querySelector(`#transcripcion${i} .transcripcion-contenido`);
        if (transcripcionDiv) {
            const transcripcionKey = `leccion${i}`;
            if (transcripciones && transcripciones[transcripcionKey]) {
                const textoFormateado = transcripciones[transcripcionKey]
                    .split('\n\n')
                    .map(parrafo => `<p>${parrafo.trim()}</p>`)
                    .join('');
                transcripcionDiv.innerHTML = textoFormateado;
            } else {
                transcripcionDiv.innerHTML = '<p>Transcripción no disponible por el momento.</p>';
            }
        }
    }
});

 // Función para actualizar el tema según la preferencia del usuario
 function updateTheme() {
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const body = document.body;

    if (prefersDarkScheme) {
      body.classList.remove('bg-light');
      body.classList.add('bg-dark');
    } else {
      body.classList.remove('bg-dark');
      body.classList.add('bg-light');
    }
  }

  // Llamar a la función cuando la página cargue
  window.addEventListener('load', updateTheme);

  // Agregar un listener para detectar cambios en la preferencia de color del usuario
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener('change', updateTheme);



