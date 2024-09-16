const peliculas = [
    { nombre: "Inception", horario: ["14:00", "17:00", "20:00"], costo: 1000 },
    { nombre: "Titanic", horario: ["13:00", "16:00", "19:00"], costo: 1200 },
    { nombre: "Avatar", horario: ["15:00", "18:00", "21:00"], costo: 1500 }
];

function verificarDescuento(edad) {
    return edad < 12 || edad >= 65;
}

// Función para calcular el costo total de las entradas
function calcularCostoTotal(cantidadEntradas, tieneDescuento, costoEntrada) {
    let costoTotal = cantidadEntradas * costoEntrada;

    if (tieneDescuento) {
        costoTotal *= 0.8; // Aplicar un 20% de descuento
    }

    return costoTotal;
}

function buscarPelicula(nombrePelicula) {
    return peliculas.find(pelicula => pelicula.nombre.toLowerCase() === nombrePelicula.toLowerCase());
}

function filtrarHorarios(pelicula) {
    return pelicula.horario;
}

function comprarEntradas() {
    // Selección de película
    const nombrePelicula = prompt("¿Qué película desea ver? (Inception, Titanic, Avatar)");
    const peliculaSeleccionada = buscarPelicula(nombrePelicula);

    // Validación de película
    if (!peliculaSeleccionada) {
        console.log("Película no encontrada. Inténtelo nuevamente.");
        return;
    }

    // Selección de horario
    const horariosDisponibles = filtrarHorarios(peliculaSeleccionada);
    const horarioSeleccionado = prompt(`Horarios disponibles para ${peliculaSeleccionada.nombre}: ${horariosDisponibles.join(", ")}. ¿Qué horario desea?`);

    if (!horariosDisponibles.includes(horarioSeleccionado)) {
        console.log("Horario no disponible. Inténtelo nuevamente.");
        return;
    }

    // Cantidad de entradas
    let cantidadEntradas = parseInt(prompt("¿Cuántas entradas desea comprar?"), 10);

    // Validación de la cantidad de entradas
    while (isNaN(cantidadEntradas) || cantidadEntradas <= 0) {
        cantidadEntradas = parseInt(prompt("Por favor, ingrese un número válido de entradas:"), 10);
    }

    // Edad del usuario
    let edad = parseInt(prompt("Ingrese su edad:"), 10);

    // Validación de la edad
    while (isNaN(edad) || edad <= 0) {
        edad = parseInt(prompt("Por favor, ingrese una edad válida:"), 10);
    }

    const tieneDescuento = verificarDescuento(edad);
    const costoTotal = calcularCostoTotal(cantidadEntradas, tieneDescuento, peliculaSeleccionada.costo);

    console.log(`El costo total de sus entradas para ${peliculaSeleccionada.nombre} a las ${horarioSeleccionado} es: $${costoTotal}`);
    if (tieneDescuento) {
        console.log("Se aplicó un descuento por edad.");
    }
}

comprarEntradas();
