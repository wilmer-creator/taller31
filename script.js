// =========================================
// OBTENER EL CANVAS
// =========================================

// Obtener el canvas desde el HTML
const canvas = document.getElementById("canvas");

// Obtener el contexto 2D
const ctx = canvas.getContext("2d");


// =========================================
// FUNCION PARA CONVERTIR COORDENADAS
// =========================================

// Convierte el eje Y del canvas
// a un sistema cartesiano

function convertirY(y) {

    return canvas.height - y;
}


// =========================================
// FUNCION PARA DIBUJAR PUNTOS
// =========================================

// Esta funcion dibuja puntos
// usando coordenadas cartesianas

function drawPoint(x, y, color = "red") {

    // Color del punto
    ctx.fillStyle = color;

    // Dibujar el punto
    ctx.fillRect(

        x,
        convertirY(y),

        8,
        8
    );
}


// =========================================
// FUNCION PARA DIBUJAR LINEAS
// =========================================

// Esta funcion dibuja lineas
// entre dos puntos

function drawLine(x1, y1, x2, y2, color = "blue") {

    // Color de la linea
    ctx.strokeStyle = color;

    // Grosor
    ctx.lineWidth = 2;

    // Iniciar dibujo
    ctx.beginPath();

    // Punto inicial
    ctx.moveTo(

        x1,
        convertirY(y1)
    );

    // Punto final
    ctx.lineTo(

        x2,
        convertirY(y2)
    );

    // Dibujar linea
    ctx.stroke();
}


// =========================================
// DIBUJAR PUNTOS DE PRUEBA
// =========================================

drawPoint(100, 100);

drawPoint(300, 250);


// =========================================
// DIBUJAR LINEA DE PRUEBA
// =========================================

drawLine(

    100,
    100,

    300,
    250
);


// =========================================
// MENSAJE DE VERIFICACION
// =========================================

console.log("Funciones de dibujo funcionando");