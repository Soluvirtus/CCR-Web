document.addEventListener("scroll", function() {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 0) {
    navbar.classList.add("scrolled-navbar");
  } else {
    navbar.classList.remove("scrolled-navbar");
  }
});


// Agregar la clase smooth-scroll al body para la transición suave al hacer clic en los enlaces
document.documentElement.classList.add('smooth-scroll');