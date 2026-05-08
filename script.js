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
// a coordenadas cartesianas

function convertirY(y) {

    return canvas.height - y;
}


// =========================================
// FUNCION PARA DIBUJAR LINEAS
// =========================================

// Esta es la unica funcion permitida
// para dibujar lineas y viewport

function drawLine(x1, y1, x2, y2, color = "black") {

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
// DATOS DE LA VENTANA DE RECORTE
// =========================================

let xmin = 100;

let ymin = 100;

let xmax = 400;

let ymax = 300;


// =========================================
// FUNCION PARA DIBUJAR EL VIEWPORT
// =========================================

// Esta funcion dibuja la ventana
// de recorte usando drawLine()

function drawWindow() {

    // Linea superior
    drawLine(

        xmin,
        ymax,

        xmax,
        ymax,

        "blue"
    );

    // Linea inferior
    drawLine(

        xmin,
        ymin,

        xmax,
        ymin,

        "blue"
    );

    // Linea izquierda
    drawLine(

        xmin,
        ymin,

        xmin,
        ymax,

        "blue"
    );

    // Linea derecha
    drawLine(

        xmax,
        ymin,

        xmax,
        ymax,

        "blue"
    );
}


// =========================================
// DIBUJAR LINEA DE PRUEBA
// =========================================

drawLine(

    50,
    50,

    500,
    350,

    "red"
);


// =========================================
// DIBUJAR VENTANA
// =========================================

drawWindow();


// =========================================
// MENSAJE DE VERIFICACION
// =========================================

console.log("Viewport funcionando correctamente");