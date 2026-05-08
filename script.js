// =========================================
// OBTENER EL CANVAS
// =========================================

const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");


// =========================================
// CONSTANTES DE REGION
// =========================================

// Valores binarios utilizados
// por el algoritmo de Cohen-Sutherland

const INSIDE = 0;

const LEFT = 1;

const RIGHT = 2;

const BOTTOM = 4;

const TOP = 8;


// =========================================
// FUNCION PARA CONVERTIR COORDENADAS
// =========================================

function convertirY(y) {

    return canvas.height - y;
}


// =========================================
// FUNCION PARA DIBUJAR LINEAS
// =========================================

// Funcion utilizada para dibujar
// lineas y viewport

function drawLine(x1, y1, x2, y2, color = "black") {

    ctx.strokeStyle = color;

    ctx.lineWidth = 2;

    ctx.beginPath();

    ctx.moveTo(

        x1,
        convertirY(y1)
    );

    ctx.lineTo(

        x2,
        convertirY(y2)
    );

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

function drawWindow() {

    // Superior
    drawLine(

        xmin,
        ymax,

        xmax,
        ymax,

        "blue"
    );

    // Inferior
    drawLine(

        xmin,
        ymin,

        xmax,
        ymin,

        "blue"
    );

    // Izquierda
    drawLine(

        xmin,
        ymin,

        xmin,
        ymax,

        "blue"
    );

    // Derecha
    drawLine(

        xmax,
        ymin,

        xmax,
        ymax,

        "blue"
    );
}


// =========================================
// FUNCION PARA CALCULAR CODIGOS
// =========================================

// Esta funcion determina en que region
// se encuentra un punto

function computeCode(x, y) {

    // Punto dentro
    let code = INSIDE;

    // Izquierda
    if (x < xmin) {

        code |= LEFT;
    }

    // Derecha
    else if (x > xmax) {

        code |= RIGHT;
    }

    // Abajo
    if (y < ymin) {

        code |= BOTTOM;
    }

    // Arriba
    else if (y > ymax) {

        code |= TOP;
    }

    return code;
}


// =========================================
// LINEA DE PRUEBA
// =========================================

let x1 = 50;

let y1 = 50;

let x2 = 500;

let y2 = 350;


// =========================================
// DIBUJAR LINEA
// =========================================

drawLine(

    x1,
    y1,

    x2,
    y2,

    "red"
);


// =========================================
// DIBUJAR VENTANA
// =========================================

drawWindow();


// =========================================
// CALCULAR CODIGOS
// =========================================

let code1 = computeCode(x1, y1);

let code2 = computeCode(x2, y2);


// =========================================
// MOSTRAR RESULTADOS
// =========================================

console.log("Codigo punto 1:", code1);

console.log("Codigo punto 2:", code2);