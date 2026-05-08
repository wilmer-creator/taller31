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
    drawLine(xmin, ymax, xmax, ymax, "blue");

    // Inferior
    drawLine(xmin, ymin, xmax, ymin, "blue");

    // Izquierda
    drawLine(xmin, ymin, xmin, ymax, "blue");

    // Derecha
    drawLine(xmax, ymin, xmax, ymax, "blue");
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
// ALGORITMO COHEN-SUTHERLAND
// =========================================

function cohenSutherland(x1, y1, x2, y2) {

    let code1 = computeCode(x1, y1);

    let code2 = computeCode(x2, y2);

    let accept = false;

    while (true) {

        // ACEPTACION TRIVIAL
        if ((code1 | code2) === 0) {

            accept = true;

            break;
        }

        // RECHAZO TRIVIAL
        else if ((code1 & code2) !== 0) {

            break;
        }

        // CALCULAR INTERSECCIONES
        else {

            let x;
            let y;

            // Punto que esta fuera
            let codeOut = code1 !== 0 ? code1 : code2;

            // ARRIBA
            if (codeOut & TOP) {

                x = x1 + (x2 - x1) *

                    (ymax - y1) / (y2 - y1);

                y = ymax;
            }

            // ABAJO
            else if (codeOut & BOTTOM) {

                x = x1 + (x2 - x1) *

                    (ymin - y1) / (y2 - y1);

                y = ymin;
            }

            // DERECHA
            else if (codeOut & RIGHT) {

                y = y1 + (y2 - y1) *

                    (xmax - x1) / (x2 - x1);

                x = xmax;
            }

            // IZQUIERDA
            else if (codeOut & LEFT) {

                y = y1 + (y2 - y1) *

                    (xmin - x1) / (x2 - x1);

                x = xmin;
            }

            // Reemplazar punto externo
            if (codeOut === code1) {

                x1 = x;

                y1 = y;

                code1 = computeCode(x1, y1);
            }

            else {

                x2 = x;

                y2 = y;

                code2 = computeCode(x2, y2);
            }
        }
    }

    return {

        accept,

        x1,

        y1,

        x2,

        y2
    };
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

    "gray"
);


// =========================================
// DIBUJAR VIEWPORT
// =========================================

drawWindow();


// =========================================
// APLICAR ALGORITMO
// =========================================

let resultado = cohenSutherland(

    x1,
    y1,

    x2,
    y2
);


// =========================================
// DIBUJAR LINEA RECORTADA
// =========================================

if (resultado.accept) {

    drawLine(

        resultado.x1,
        resultado.y1,

        resultado.x2,
        resultado.y2,

        "red"
    );
}


// =========================================
// MOSTRAR RESULTADOS
// =========================================

console.log(resultado);