// Función para verificar si el usuario tiene derecho a un descuento basado en la edad
function verificarDescuento(edad) {
    if (edad < 12 || edad >= 65) {
        return true;
    } else {
        return false;
    }
}

// Función para calcular el costo total de las entradas
function calcularCostoTotal(cantidadEntradas, tieneDescuento) {
    const costoEntrada = 1000;
    let costoTotal = cantidadEntradas * costoEntrada;

    if (tieneDescuento) {
        costoTotal *= 0.8; // Aplicar un 20% de descuento
    }

    return costoTotal;
}

// Función principal que controla el proceso de compra de entradas
function comprarEntradas() {
    let cantidadEntradas = parseInt(prompt("¿Cuántas entradas desea comprar?"), 10);

    // Validación de la cantidad de entradas
    while (isNaN(cantidadEntradas) || cantidadEntradas <= 0) {
        cantidadEntradas = parseInt(prompt("Por favor, ingrese un número válido de entradas:"), 10);
    }

    let edad = parseInt(prompt("Ingrese su edad:"), 10);

    // Validación de la edad
    while (isNaN(edad) || edad <= 0) {
        edad = parseInt(prompt("Por favor, ingrese una edad válida:"), 10);
    }

    const tieneDescuento = verificarDescuento(edad);
    const costoTotal = calcularCostoTotal(cantidadEntradas, tieneDescuento);

    // Mostrar el costo total de las entradas
    console.log(`El costo total de sus entradas es: $${costoTotal}`);
    if (tieneDescuento) {
        console.log("Se aplicó un descuento por edad.");
    }
}

// Llamada a la función principal
comprarEntradas();
