
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

// Función para abrir la galería en el modal
window.openGalleryModal = function (imageUrls, startIndex = 0) {
  const container = document.getElementById("galleryCarouselContainer");
  const modalElement = document.getElementById("imageModal");
  
  if (!container || !modalElement) return;

  // Generar indicadores y slides
  let indicators = '';
  let slides = '';

  imageUrls.forEach((url, i) => {
      const activeClass = i === startIndex ? 'active' : '';
      
      // Indicators
      indicators += `<button type="button" data-bs-target="#galleryCarousel" data-bs-slide-to="${i}" class="${activeClass}" aria-current="${activeClass === 'active'}" aria-label="Slide ${i + 1}"></button>`;
      
      // Slides
      slides += `
      <div class="carousel-item h-100 ${activeClass}">
          <div class="d-flex align-items-center justify-content-center h-100">
             <img src="${url}" class="img-fluid" style="max-height: 100vh; object-fit: contain;" alt="Galería">
          </div>
      </div>`;
  });

  // Construir HTML del Carrusel
  const carouselHtml = `
  <div id="galleryCarousel" class="carousel slide carousel-fade w-100 h-100" data-bs-ride="false">
      <div class="carousel-indicators">
          ${indicators}
      </div>
      <div class="carousel-inner h-100">
          ${slides}
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#galleryCarousel" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Anterior</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#galleryCarousel" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Siguiente</span>
      </button>
  </div>`;

  container.innerHTML = carouselHtml;

  // Inicializar y mostrar modal
  const imageModal = new bootstrap.Modal(modalElement);
  imageModal.show();
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

// --- Configuración Contentful (desde config.js) ---
const SPACE_ID = typeof CONFIG !== 'undefined' ? CONFIG.CONTENTFUL_SPACE_ID : 'PLACEHOLDER';
const ACCESS_TOKEN = typeof CONFIG !== 'undefined' ? CONFIG.CONTENTFUL_ACCESS_TOKEN : 'PLACEHOLDER';
const CONTENT_TYPE_ID = typeof CONFIG !== 'undefined' ? CONFIG.CONTENTFUL_CONTENT_TYPE : 'evento';
console.log(SPACE_ID)
let client;
if (typeof contentful !== 'undefined') {
  client = contentful.createClient({
    space: SPACE_ID,
    accessToken: ACCESS_TOKEN
  });
}

/**
 * Carga eventos desde Contentful
 */
/**
 * Carga eventos desde Contentful
 */
/**
 * Carga eventos desde Contentful
 */
async function loadContentfulEvents() {
  const containerProximos = document.getElementById("eventos-proximos-container");
  const containerPasados = document.getElementById("eventos-pasados-container");
  const containerArchivo = document.getElementById("eventos-archivo-container"); // Nuevo contenedor para la página de archivo
  
  // Detectar si estamos en Home o en Archivo
  const isArchivePage = !!containerArchivo;
  const isHomePage = !!(containerProximos && containerPasados);

  if (!isArchivePage && !isHomePage) return;

  // Loading spinner
  const loaderHtml = '<div class="spinner-border text-primary" role="status"><span class="visually-hidden">Cargando eventos...</span></div>';
  if (isHomePage) {
      containerProximos.innerHTML = loaderHtml;
      containerPasados.innerHTML = loaderHtml;
  }
  if (isArchivePage) {
      containerArchivo.innerHTML = loaderHtml;
  }

  try {
    if (!client) throw new Error("Contentful SDK no cargado.");

    const response = await client.getEntries({
      content_type: CONTENT_TYPE_ID,
      order: 'fields.date' // Orden ascendente por defecto
    });

    // Separar y Ordenar
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let upcomingEvents = [];
    let pastEvents = [];

    response.items.forEach(entry => {
        const date = new Date(entry.fields.date);
        // Timezone adjustment
        date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
        
        if (date < today) {
            pastEvents.push({ entry, date });
        } else {
            upcomingEvents.push({ entry, date });
        }
    });

    // Ordenar: 
    // Próximos: Ascendente (Más cercano primero) -> Ya viene así de Contentful o sort JS
    upcomingEvents.sort((a, b) => a.date - b.date);
    
    // Pasados: Descendente (Más reciente primero) para que salgan los del último domingo arriba
    pastEvents.sort((a, b) => b.date - a.date);


    // Helper Google Calendar Link
    const generateCalendarUrl = (title, description, location, dateObj) => {
        // Formato YYYYMMDDTHHmmSSZ
        const start = dateObj.toISOString().replace(/-|:|\.\d\d\d/g, ""); 
        // Asumimos 2 horas de duración por defecto
        const endDate = new Date(dateObj.getTime() + (2 * 60 * 60 * 1000));
        const end = endDate.toISOString().replace(/-|:|\.\d\d\d/g, "");
        
        const details = encodeURIComponent(description || '');
        const text = encodeURIComponent(title || 'Evento CCR');
        const loc = encodeURIComponent(location || '');
        
        return `https://www.google.com/calendar/render?action=TEMPLATE&text=${text}&details=${details}&location=${loc}&dates=${start}/${end}`;
    };

    // Render Helper
    const renderCard = (item, isPast) => {
      const entry = item.entry;
      const fields = entry.fields;
      const titulo = fields.title || 'Sin Título';
      
      // Fecha formateada (Ej: LUN, 12 DIC 2025)
      const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
      let fechaLegible = item.date.toLocaleDateString('es-MX', options).replace('.', '').toUpperCase();
      
      // Hora formateada (Ej: 10:30 AM) - Solo si tiene hora definida distinta de 00:00 (opcional) o siempre
      const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: true };
      let horaLegible = item.date.toLocaleTimeString('es-MX', timeOptions).toUpperCase();

      const descripcion = fields.description || ''; 
      const imagenes = fields.images || []; 
      
      // Badge logic
      let badgeHtml = '';
      if (isPast) {
          badgeHtml = '<span class="event-countdown past">FINALIZADO</span>';
      } else {
            const diffTime = Math.abs(item.date - today);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
            const text = diffDays === 0 ? '¡ES HOY!' : `FALTAN ${diffDays} DÍAS`;
            badgeHtml = `<span class="event-countdown future">${text}</span>`;
      }
      
      // Google Calendar logic (Only for upcoming)
      let calendarBtn = '';
      if (!isPast) {
         const gLink = generateCalendarUrl(titulo, descripcion, fields.place, item.date);
         calendarBtn = `
         <a href="${gLink}" target="_blank" class="btn btn-sm btn-outline-primary rounded-pill mt-3 px-3">
            <i class="bi bi-calendar-plus me-1"></i> Agendar
         </a>`;
      }

      // Gallery Logic
      const imageUrls = imagenes.map(img => img.fields.file.url);
      const imageUrlsJson = JSON.stringify(imageUrls).replace(/"/g, "&quot;");

      let mediaHtml = '';
      // Altura unificada para todos los eventos (Grid Vertical)
      const imgStyle = 'height: 250px;'; 

      if (imagenes.length > 0) {
        const count = imagenes.length;
        let gridClass = 'grid-1';
        if (count === 2) gridClass = 'grid-2';
        if (count === 3) gridClass = 'grid-3';
        if (count >= 4) gridClass = 'grid-4';

        let imagesHtml = '';
        const limit = Math.min(count, 4);

        for(let i=0; i<limit; i++) {
            const imgUrl = imageUrls[i];
            if (i === 3 && count > 4) {
                imagesHtml += `
                <div class="more-overlay" style="height: 100%;" onclick="openGalleryModal(${imageUrlsJson}, 3)">
                    <img src="${imgUrl}" alt="Evento">
                    <div class="overlay-text">+${count - 4}</div>
                </div>`;
            } else {
                imagesHtml += `<img src="${imgUrl}" alt="Evento" onclick="openGalleryModal(${imageUrlsJson}, ${i})">`;
            }
        }
        mediaHtml = `<div class="photo-grid ${gridClass}" style="${imgStyle}">${imagesHtml}</div>`;
      }

      // --- LAYOUT UNIFICADO VERTICAL (Grid) ---
      // Determinamos clase específica para styling CSS
      const eventTypeClass = isPast ? 'event-past' : 'event-future';

      return `
        <div class="col-md-6 col-lg-4 d-flex align-items-stretch">
            <div class="card event-card shadow-sm w-100 border-0 overflow-hidden ${eventTypeClass}"> 
                <div style="width: 100%; border-top-left-radius: 1rem; border-top-right-radius: 1rem; overflow: hidden;">
                   ${mediaHtml}
                </div>
                <div class="card-body p-4 text-start d-flex flex-column">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <span class="event-date-display ${!isPast ? 'text-primary' : ''}">${fechaLegible}</span>
                        ${badgeHtml}
                    </div>
                    
                    <h5 class="card-title fw-bold mb-2 text-dark">${titulo}</h5>
                    
                    ${!isPast ? `
                    <div class="d-flex gap-3 mb-2 small text-muted">
                        ${fields.place ? `
                        <div class="event-location">
                            <i class="bi bi-geo-alt-fill me-1"></i>
                            <span>${fields.place}</span>
                        </div>` : ''}
                        
                        <div class="event-time">
                            <i class="bi bi-clock-fill me-1 text-primary"></i>
                            <span>${horaLegible}</span>
                        </div>
                    </div>` : ''}

                    <!-- Descripción solo par eventos próximos -->
                    ${!isPast ? `<p class="card-text small text-muted flex-grow-1">${descripcion}</p>` : ''}

                    <!-- Botón de Agendar (Solo Próximos) -->
                    ${calendarBtn}
                </div>
            </div>
        </div>
      `;
    };

    // --- RENDERIZADO HOME ---
    if (isHomePage) {
        // Render Próximos (Todos)
        if (upcomingEvents.length > 0) {
            containerProximos.innerHTML = upcomingEvents.map(item => renderCard(item, false)).join('');
        } else {
            containerProximos.innerHTML = '<div class="alert alert-light w-100">No hay eventos próximos programados.</div>';
        }

        // Render Pasados (Limitado a 4)
        if (pastEvents.length > 0) {
            const limit = 4;
            let pastHtml = pastEvents.slice(0, limit).map(item => renderCard(item, true)).join('');
            
            // Botón Ver Más
            if (pastEvents.length > limit) {
                pastHtml += `
                <div class="col-12 text-center mt-4">
                    <a href="eventos.html" class="btn btn-outline-secondary rounded-pill px-4">
                        Ver más recuerdos <i class="bi bi-arrow-right ms-2"></i>
                    </a>
                </div>
                `;
            }
            containerPasados.innerHTML = pastHtml;
        } else {
            containerPasados.innerHTML = '<div class="alert alert-light w-100">Aún no hay eventos pasados para mostrar.</div>';
        }
    }

    // --- RENDERIZADO ARCHIVO ---
    if (isArchivePage) {
        if (pastEvents.length > 0) {
            containerArchivo.innerHTML = pastEvents.map(item => renderCard(item, true)).join('');
        } else {
            containerArchivo.innerHTML = '<div class="alert alert-light w-100">No hay eventos archivados.</div>';
        }
    }

  } catch (error) {
    console.error("Error cargando Contentful:", error);
    const errorMsg = '<p class="text-muted">Error al cargar eventos.</p>';
    if(containerProximos) containerProximos.innerHTML = errorMsg;
    if(containerArchivo) containerArchivo.innerHTML = errorMsg;
  }
}

// Cargar eventos al iniciar
document.addEventListener("DOMContentLoaded", () => {
    // Ejecutar si existe alguno de los contenedores clave
    if (document.getElementById('eventos-proximos-container') || document.getElementById('eventos-archivo-container')) {
        loadContentfulEvents(); 
    }
});