document.addEventListener('DOMContentLoaded', function() {
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
});