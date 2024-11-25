
const d = document;
const $form = d.querySelector('form');
// Inicializar los iconos de Lucide
lucide.createIcons();
d.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 0) {
    navbar.classList.add("scrolled-navbar");
  } else {
    navbar.classList.remove("scrolled-navbar");
  }
});


// Agregar la clase smooth-scroll al body para la transición suave al hacer clic en los enlaces
d.documentElement.classList.add('smooth-scroll');


d.addEventListener("submit", (e) => {
  // e.preventDefault();
  alert("Enviando datos")
  const $loader = d.querySelector('.contact-form-loader');
  const $response = d.querySelector('.contact-form-response');
  $loader.classList.remove("none");
  // // ".form-group textarea", ".form-group button"
  const $formInputs = d.querySelectorAll(".form-group input, textarea")
  const $formButton = d.querySelector("#formButton")
  
  console.log($formButton);
  $formButton.setAttribute("disabled", "");
  $formInputs.forEach(element => {
    console.log(element);
    
    // element.setAttribute('disabled')
  });

  setTimeout(() => {
    $loader.classList.add("none")
    $response.classList.remove("none");
    $form.reset();
    $formButton.removeAttribute("disabled");

    setTimeout(() => $response.classList.add("none"), 5000);
  }, 3000);
})

// Detectar si la URL actual es "/links"
if (window.location.pathname === '/links') {
  // Redirigir a linktree.html
  window.location.replace('/linktree.html');
}