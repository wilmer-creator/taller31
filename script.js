
// Obtener el canvas desde el HTML
const canvas = document.getElementById("canvas");

// Obtener el contexto 2D
const ctx = canvas.getContext("2d");



// Esta funcion convierte el eje Y del canvas
// a un sistema cartesiano donde el origen
// queda en la esquina inferior izquierda

function convertirY(y) {

    return canvas.height - y;
}


// =========================================
// DIBUJAR PUNTO DE PRUEBA
// =========================================

// Color del punto
ctx.fillStyle = "red";

// Dibujar punto usando coordenadas cartesianas
ctx.fillRect(100, convertirY(100), 8, 8);


// =========================================
// MENSAJE DE VERIFICACION
// =========================================

console.log("Sistema cartesiano funcionando");