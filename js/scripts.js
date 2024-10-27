// Seleccionar elementos del DOM
const selectPelicula = document.getElementById('pelicula');
const selectHorario = document.getElementById('horario');
const resultadoDiv = document.getElementById('resultado');
const mensajeCosto = document.getElementById('mensajeCosto');
const mensajeDescuento = document.getElementById('mensajeDescuento');

let peliculas = []; // Array vacío que se llenará con fetch

// Función para cargar películas desde JSON
async function cargarPeliculas() {
    try {
        const response = await fetch('peliculas.json');
        peliculas = await response.json();
        cargarOpcionesPeliculas();
    } catch (error) {
        console.error("Error al cargar las películas:", error);
    }
}

// Llenar el select de películas
function cargarOpcionesPeliculas() {
    selectPelicula.innerHTML = '<option value="" selected>-- Seleccione una película --</option>';
    peliculas.forEach(pelicula => {
        const option = document.createElement('option');
        option.value = pelicula.nombre;
        option.textContent = pelicula.nombre;
        selectPelicula.appendChild(option);
    });
}

// Función para buscar una película por nombre
function buscarPelicula(nombrePelicula) {
    return peliculas.find(pelicula => pelicula.nombre === nombrePelicula);
}

// Evento para mostrar horarios cuando se selecciona una película
selectPelicula.addEventListener('change', () => {
    const peliculaSeleccionada = buscarPelicula(selectPelicula.value);
    selectHorario.innerHTML = ''; // Limpiar horarios previos

    if (peliculaSeleccionada) {
        peliculaSeleccionada.horario.forEach(hora => {
            const option = document.createElement('option');
            option.value = hora;
            option.textContent = hora;
            selectHorario.appendChild(option);
        });
        document.getElementById('horariosDiv').style.display = 'block';
    } else {
        document.getElementById('horariosDiv').style.display = 'none';
    }
});

// Función para calcular el costo total
function calcularCostoTotal(cantidadEntradas, tieneDescuento, costoEntrada) {
    let costoTotal = cantidadEntradas * costoEntrada;
    return tieneDescuento ? costoTotal * 0.8 : costoTotal; // Aplicar 20% de descuento
}

// Función para verificar descuento por edad
function verificarDescuento(edad) {
    return edad < 12 || edad >= 65;
}

// Evento para procesar la compra
document.getElementById('comprarBtn').addEventListener('click', () => {
    resultadoDiv.textContent = '';
    mensajeCosto.textContent = '';
    mensajeDescuento.textContent = '';

    const nombrePelicula = selectPelicula.value;
    const horarioSeleccionado = selectHorario.value;
    const cantidadEntradas = parseInt(document.getElementById('entradas').value, 10);
    const edad = parseInt(document.getElementById('edad').value, 10);

    if (!nombrePelicula || !horarioSeleccionado || isNaN(cantidadEntradas) || cantidadEntradas <= 0 || isNaN(edad) || edad <= 0) {
        resultadoDiv.textContent = 'Por favor, complete todos los campos correctamente.';
        return;
    }

    const peliculaSeleccionada = buscarPelicula(nombrePelicula);
    const tieneDescuento = verificarDescuento(edad);
    const costoTotal = calcularCostoTotal(cantidadEntradas, tieneDescuento, peliculaSeleccionada.costo);

    mensajeCosto.textContent = `El costo total de sus entradas para ${peliculaSeleccionada.nombre} a las ${horarioSeleccionado} es: $${costoTotal}`;
    mensajeDescuento.textContent = tieneDescuento ? "Se aplicó un descuento por edad." : "No se aplicó descuento.";
});

// Llamar a la función para cargar las películas al iniciar
cargarPeliculas();
