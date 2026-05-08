// =========================================
// OBTENER EL CANVAS
// =========================================

const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");


// =========================================
// CONSTANTES DE REGION
// =========================================

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
// DATOS DEL VIEWPORT
// =========================================

let xmin = 100;

let ymin = 100;

let xmax = 400;

let ymax = 300;


// =========================================
// DIBUJAR VENTANA
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
// CALCULAR CODIGO DE REGION
// =========================================

function computeCode(x, y) {

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
// FUNCION PRINCIPAL DEL ALGORITMO
// =========================================

// Esta funcion solamente verifica
// aceptacion y rechazo trivial

function cohenSutherland(x1, y1, x2, y2) {

    let code1 = computeCode(x1, y1);

    let code2 = computeCode(x2, y2);

    // ACEPTACION TRIVIAL
    if ((code1 | code2) === 0) {

        console.log("Linea completamente dentro");

        return true;
    }

    // RECHAZO TRIVIAL
    else if ((code1 & code2) !== 0) {

        console.log("Linea completamente fuera");

        return false;
    }

    // CASO PARCIAL
    else {

        console.log("Linea necesita recorte");

        return null;
    }
}


// =========================================
// LINEA DE PRUEBA
// =========================================

let x1 = 50;

let y1 = 50;

let x2 = 500;

let y2 = 350;


// =========================================
// DIBUJAR LINEA ORIGINAL
// =========================================

drawLine(

    x1,
    y1,

    x2,
    y2,

    "red"
);


// =========================================
// DIBUJAR VIEWPORT
// =========================================

drawWindow();


// =========================================
// PROBAR ALGORITMO
// =========================================

let resultado = cohenSutherland(

    x1,
    y1,

    x2,
    y2
);


// =========================================
// MOSTRAR RESULTADO
// =========================================

console.log("Resultado:", resultado);