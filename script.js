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
// DATOS DEL VIEWPORT
// =========================================

let xmin = 100;

let ymin = 100;

let xmax = 400;

let ymax = 300;


// =========================================
// CASOS DE PRUEBA
// =========================================

const casos = [

    // Dentro
    {
        x1: 150,
        y1: 150,

        x2: 350,
        y2: 250
    },

    // Fuera
    {
        x1: 20,
        y1: 400,

        x2: 60,
        y2: 450
    },

    // Cruza izquierda
    {
        x1: 20,
        y1: 200,

        x2: 300,
        y2: 200
    },

    // Cruza arriba
    {
        x1: 200,
        y1: 50,

        x2: 250,
        y2: 450
    },

    // Cruza varios lados
    {
        x1: 50,
        y1: 50,

        x2: 500,
        y2: 350
    }
];


// =========================================
// INDICE ACTUAL
// =========================================

let indiceActual = 0;


// =========================================
// FUNCION PARA CONVERTIR COORDENADAS
// =========================================

function convertirY(y) {

    return canvas.height - y;
}


// =========================================
// FUNCION PARA DIBUJAR LINEAS
// =========================================

// Funcion utilizada para:
// - dibujar lineas
// - dibujar viewport

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
// FUNCION PARA DIBUJAR VIEWPORT
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
// FUNCION PARA CALCULAR CODIGO
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

        // Aceptacion trivial
        if ((code1 | code2) === 0) {

            accept = true;

            break;
        }

        // Rechazo trivial
        else if ((code1 & code2) !== 0) {

            break;
        }

        // Recorte
        else {

            let x;
            let y;

            let codeOut = code1 !== 0 ? code1 : code2;

            // Arriba
            if (codeOut & TOP) {

                x = x1 + (x2 - x1) *

                    (ymax - y1) / (y2 - y1);

                y = ymax;
            }

            // Abajo
            else if (codeOut & BOTTOM) {

                x = x1 + (x2 - x1) *

                    (ymin - y1) / (y2 - y1);

                y = ymin;
            }

            // Derecha
            else if (codeOut & RIGHT) {

                y = y1 + (y2 - y1) *

                    (xmax - x1) / (x2 - x1);

                x = xmax;
            }

            // Izquierda
            else if (codeOut & LEFT) {

                y = y1 + (y2 - y1) *

                    (xmin - x1) / (x2 - x1);

                x = xmin;
            }

            // Reemplazar punto
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
// MOSTRAR INFORMACION
// =========================================

function mostrarInfo(linea, resultado) {

    const info = document.getElementById("info");

    info.innerHTML = `

        <p>
            <strong>Linea Original</strong>
        </p>

        <p>
            P1:
            (${linea.x1}, ${linea.y1})
        </p>

        <p>
            P2:
            (${linea.x2}, ${linea.y2})
        </p>

        <hr>

        <p>
            <strong>Resultado</strong>
        </p>

        <p>
            Visible:
            ${resultado.accept}
        </p>

        <p>
            P1:
            (${resultado.x1.toFixed(2)},
            ${resultado.y1.toFixed(2)})
        </p>

        <p>
            P2:
            (${resultado.x2.toFixed(2)},
            ${resultado.y2.toFixed(2)})
        </p>
    `;
}


// =========================================
// DIBUJAR ESCENA
// =========================================

function drawScene() {

    // Limpiar canvas
    ctx.clearRect(

        0,
        0,

        canvas.width,
        canvas.height
    );

    // Dibujar viewport
    drawWindow();

    // Obtener linea actual
    let linea = casos[indiceActual];

    // Dibujar linea original
    drawLine(

        linea.x1,
        linea.y1,

        linea.x2,
        linea.y2,

        "gray"
    );

    // Aplicar algoritmo
    let resultado = cohenSutherland(

        linea.x1,
        linea.y1,

        linea.x2,
        linea.y2
    );

    // Dibujar linea recortada
    if (resultado.accept) {

        drawLine(

            resultado.x1,
            resultado.y1,

            resultado.x2,
            resultado.y2,

            "red"
        );
    }

    // Mostrar informacion
    mostrarInfo(linea, resultado);
}


// =========================================
// SIGUIENTE CASO
// =========================================

function siguienteCaso() {

    indiceActual++;

    // Reiniciar indice
    if (indiceActual >= casos.length) {

        indiceActual = 0;
    }

    drawScene();
}


// =========================================
// CASO ANTERIOR
// =========================================

function anteriorCaso() {

    indiceActual--;

    // Reiniciar indice
    if (indiceActual < 0) {

        indiceActual = casos.length - 1;
    }

    drawScene();
}


// =========================================
// ACTUALIZAR VIEWPORT
// =========================================

function actualizarVentana() {

    xmin = parseInt(

        document.getElementById("xmin").value
    );

    ymin = parseInt(

        document.getElementById("ymin").value
    );

    xmax = parseInt(

        document.getElementById("xmax").value
    );

    ymax = parseInt(

        document.getElementById("ymax").value
    );

    drawScene();
}


// =========================================
// INICIAR ESCENA
// =========================================

drawScene();