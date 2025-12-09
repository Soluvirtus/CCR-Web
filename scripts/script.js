// Función para inicializar los scripts que dependen de la barra de navegación
function initializeNavbarScripts() {
  // Efecto de scroll en la Navbar
  document.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    if (navbar) {
      // Comprobar si la navbar existe
      if (window.scrollY > 0) {
        navbar.classList.add("scrolled-navbar");
      } else {
        navbar.classList.remove("scrolled-navbar");
      }
    }
  });

  // Botones de cambio de tema
  const themeToggleBtn = document.getElementById("theme-toggle");
  const themeToggleBtnMobile = document.getElementById("theme-toggle-mobile");

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      updateTheme(); // Llama a la función global updateTheme
    });
  }

  if (themeToggleBtnMobile) {
    themeToggleBtnMobile.addEventListener("click", () => {
      updateTheme(); // Llama a la función global updateTheme
    });
  }

  // Llama a updateTheme al cargar para establecer el estado inicial de los íconos en la navbar
  updateTheme(true);
}

// Listener principal que se ejecuta cuando el HTML está listo
document.addEventListener("DOMContentLoaded", function () {
  // Cargar la barra de navegación
  fetch("nav.html")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.text();
    })
    .then((data) => {
      const placeholder = document.getElementById("navbar-placeholder");
      if (placeholder) {
        placeholder.innerHTML = data;
      }
      // Una vez que la navbar está cargada, inicializa los scripts correspondientes
      initializeNavbarScripts();
    })
    .catch((error) => {
      console.error(
        "Hubo un problema al cargar la barra de navegación:",
        error
      );
    });

  // Header Background Slideshow
  const headerBackgroundImages = [
    "assets/img/slideshow/ccr1.jpeg",
    "assets/img/slideshow/IMG_1919.webp",
    "assets/img/slideshow/IMG_0257.webp",
    "assets/img/slideshow/IMG_0499.webp"
  ];

  let currentHeaderImageIndex = 0;
  const bgElement = document.querySelector(".bgimg-1");
  const layer1 = bgElement ? bgElement.querySelector(".layer-1") : null;
  const layer2 = bgElement ? bgElement.querySelector(".layer-2") : null;

  if (bgElement && layer1 && layer2) {
    // Set initial background images
    layer1.style.backgroundImage = `url(${headerBackgroundImages[0]})`;
    layer1.classList.add("active");

    // Función para cambiar la imagen de fondo del header
    function changeHeaderBackground() {
      const prevIndex = currentHeaderImageIndex;
      currentHeaderImageIndex = (currentHeaderImageIndex + 1) % headerBackgroundImages.length;

      const currentActiveLayer = (prevIndex % 2 === 0) ? layer1 : layer2;
      const nextInactiveLayer = (prevIndex % 2 === 0) ? layer2 : layer1;

      // Set the next image on the inactive layer
      nextInactiveLayer.style.backgroundImage = `url(${headerBackgroundImages[currentHeaderImageIndex]})`;

      // Deactivate current layer and activate next layer
      currentActiveLayer.classList.remove("active");
      nextInactiveLayer.classList.add("active");
    }

    // Configurar el intervalo para cambiar imágenes de fondo (cada 5 segundos)
    setInterval(changeHeaderBackground, 5000);
  }

  // --- El resto de los scripts que no dependen de la navbar ---

  // Dynamic Carousel Population
  const slideshowImages = [
    "assets/img/slideshow/tabasco.jpg",
    "assets/img/slideshow/ccr_ppll.jpg",
    "assets/img/slideshow/cccr_sola_scriptura.jpg",
    "assets/img/slideshow/ccr_navidad.jpg",
    "assets/img/slideshow/ccr_cena.jpg",
    "assets/img/slideshow/ccr_entrance.jpg",
    "assets/img/slideshow/unnamed.jpg",
    "assets/img/slideshow/ccr1.jpeg",
    "assets/img/slideshow/IMG_2305.webp",
    "assets/img/slideshow/IMG_2269.webp",
    "assets/img/slideshow/IMG_1971.webp",
    "assets/img/slideshow/IMG_1919.webp",
    "assets/img/slideshow/IMG_1687.webp",
    "assets/img/slideshow/IMG_1604.webp",
    "assets/img/slideshow/IMG_1598.webp",
    "assets/img/slideshow/IMG_0292.webp",
    "assets/img/slideshow/IMG_0257.webp",
    "assets/img/slideshow/IMG_0292.webp"
  ];

  const carouselInner = document.querySelector("#imageCarousel .carousel-inner");

  if (carouselInner) {
    slideshowImages.forEach((imagePath, index) => {
      const carouselItem = document.createElement("div");
      carouselItem.classList.add("carousel-item");
      if (index === 0) {
        carouselItem.classList.add("active");
      }

      const img = document.createElement("img");
      img.src = imagePath;
      img.classList.add("d-block", "w-100");
      img.alt = "..."; // You might want to generate more descriptive alt text
      img.loading = "lazy";

      carouselItem.appendChild(img);
      carouselInner.appendChild(carouselItem);
    });
  }

  // Notificación flash
  const historiaButton = document.querySelector("#historiaBtn");
  if (historiaButton) {
    historiaButton.addEventListener("click", function (e) {
      e.preventDefault();
      const toastElement = document.getElementById("flashNotification");
      if (toastElement) {
        const toast = new bootstrap.Toast(toastElement, {
          delay: 2000,
        });
        toast.show();
      }
    });
  }

  // Envío de formulario
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", (e) => {
      const loader = document.querySelector(".contact-form-loader");
      const response = document.querySelector(".contact-form-response");
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

  // Redirección de links
  if (window.location.pathname === "/links") {
    window.location.replace("/linktree.html");
  }

  // Cargar transcripciones
  for (let i = 1; i <= 13; i++) {
    const transcripcionDiv = document.querySelector(
      `#transcripcion${i} .transcripcion-contenido`
    );
    if (transcripcionDiv) {
      const transcripcionKey = `leccion${i}`;
      if (
        typeof transcripciones !== "undefined" &&
        transcripciones[transcripcionKey]
      ) {
        const textoFormateado = transcripciones[transcripcionKey]
          .split("\n\n")
          .map((parrafo) => `<p>${parrafo.trim()}</p>`)
          .join("");
        transcripcionDiv.innerHTML = textoFormateado;
      } else {
        transcripcionDiv.innerHTML =
          "<p>Transcripción no disponible por el momento.</p>";
      }
    }
  }
  // Scroll Reveal Observer
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, observerOptions);

  document.querySelectorAll(".reveal").forEach((el) => {
    observer.observe(el);
  });
});

// --- Funciones Globales ---

// Función para abrir imagen en modal
window.openImageModal = function (imgSrc) {
  const modalImage = document.getElementById("modalImage");
  if (modalImage) {
    modalImage.src = imgSrc;
    const imageModal = new bootstrap.Modal(
      document.getElementById("imageModal")
    );

    const modalBody = document.querySelector(".modal-body");
    if (modalBody) {
      modalBody.addEventListener("click", function (e) {
        if (e.target === modalBody) {
          imageModal.hide();
        }
      });
    }
    imageModal.show();
  }
};

// Función para actualizar el tema según la preferencia del usuario
function updateTheme(isInitialLoad = false) {
  const body = document.body;
  let isDarkMode;

  if (isInitialLoad) {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      isDarkMode = true;
    } else if (savedTheme === "light") {
      isDarkMode = false;
    } else {
      isDarkMode = false; // Default a light mode
    }
  } else {
    isDarkMode = !body.classList.contains("dark-mode");
  }

  if (isDarkMode) {
    body.classList.add("dark-mode");
    localStorage.setItem("theme", "dark");
  } else {
    body.classList.remove("dark-mode");
    localStorage.setItem("theme", "light");
  }

  // Actualizar íconos del tema
  const themeIcon = document.getElementById("theme-icon");
  const themeIconMobile = document.getElementById("theme-icon-mobile");

  if (themeIcon) {
    if (isDarkMode) {
      themeIcon.classList.replace("bi-sun-fill", "bi-moon-fill");
    } else {
      themeIcon.classList.replace("bi-moon-fill", "bi-sun-fill");
    }
  }
  if (themeIconMobile) {
    if (isDarkMode) {
      themeIconMobile.classList.replace("bi-sun-fill", "bi-moon-fill");
    } else {
      themeIconMobile.classList.replace("bi-moon-fill", "bi-sun-fill");
    }
  }
}

// Llamar a la función cuando la página cargue para establecer el tema inicial del body
// La inicialización de los íconos se hace en initializeNavbarScripts
window.addEventListener("load", () => updateTheme(true));
