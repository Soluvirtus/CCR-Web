// Función para reproducir sonido en los enlaces
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.link').forEach(link => {
        link.addEventListener('click', () => {
            const audio = document.getElementById('linkSound');
            audio.currentTime = 0; // Reinicia el sonido si ya estaba reproduciéndose
            audio.play();
        });
    });
});
