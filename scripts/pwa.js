let deferredPrompt;
const installButton = document.getElementById('installBtn');
const installContainer = document.getElementById('installContainer');

// Registrar el service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('Service Worker registrado con éxito:', registration);
      })
      .catch(error => {
        console.log('Error al registrar el Service Worker:', error);
      });
  });
}

// Escuchar el evento beforeinstallprompt
window.addEventListener('beforeinstallprompt', (e) => {
  // Prevenir que Chrome muestre la mini-infobar
  e.preventDefault();
  // Guardar el evento para usarlo después
  deferredPrompt = e;
  // Mostrar el botón de instalación
  installContainer.style.display = 'block';
});

// Manejar el clic en el botón de instalación
installButton.addEventListener('click', async () => {
  if (!deferredPrompt) {
    return;
  }
  // Mostrar el prompt de instalación
  deferredPrompt.prompt();
  // Esperar la respuesta del usuario
  const { outcome } = await deferredPrompt.userChoice;
  // Limpiar el prompt guardado
  deferredPrompt = null;
  // Ocultar el botón de instalación
  installContainer.style.display = 'none';
});

// Escuchar cuando la app ha sido instalada
window.addEventListener('appinstalled', () => {
  // Limpiar el prompt guardado
  deferredPrompt = null;
  // Ocultar el botón de instalación
  installContainer.style.display = 'none';
});
