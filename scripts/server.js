const express = require('express');
const path = require('path');
const app = express();
const PORT = 9090;

// Sirve archivos estáticos desde el nivel raíz del proyecto
app.use(express.static(path.join(__dirname, '../')));

// Ruta principal que sirve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

// Ruta para /links que sirve linktree.html
app.get('/links', (req, res) => {
    console.log('/links');
    
    res.sendFile(path.join(__dirname, '../linktree.html'));
});

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://127.0.0.1:${PORT}`);
});
