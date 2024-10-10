document.addEventListener("DOMContentLoaded", function () {
    const peliculas = [
        { nombre: "Inception", horario: ["14:00", "17:00", "20:00"], costo: 1000 },
        { nombre: "Titanic", horario: ["13:00", "16:00", "19:00"], costo: 1200 },
        { nombre: "Avatar", horario: ["15:00", "18:00", "21:00"], costo: 1500 }
    ];

    // Función para calcular el costo total de las entradas
    function calcularCostoTotal(cantidadEntradas, tieneDescuento, costoEntrada) {
        let costoTotal = cantidadEntradas * costoEntrada;
        if (tieneDescuento) {
            costoTotal *= 0.8; // Aplicar un 20% de descuento
        }
        return costoTotal;
    }

    // Función para verificar si aplica descuento por edad
    function verificarDescuento(edad) {
        return edad < 12 || edad >= 65;
    }

    // Función para buscar película por nombre
    function buscarPelicula(nombrePelicula) {
        return peliculas.find(pelicula => pelicula.nombre.toLowerCase() === nombrePelicula.toLowerCase());
    }

    // Cargar las películas en el select
    const selectPelicula = document.getElementById('pelicula');
    peliculas.forEach(pelicula => {
        const option = document.createElement('option');
        option.value = pelicula.nombre;
        option.textContent = pelicula.nombre;
        selectPelicula.appendChild(option);
    });

    // Evento para mostrar horarios cuando se selecciona una película
    selectPelicula.addEventListener('change', () => {
        const peliculaSeleccionada = buscarPelicula(selectPelicula.value);
        const selectHorario = document.getElementById('horario');
        selectHorario.innerHTML = ''; // Limpiar los horarios previos

        if (peliculaSeleccionada) {
            document.getElementById('horariosDiv').style.display = 'block';
            peliculaSeleccionada.horario.forEach(hora => {
                const option = document.createElement('option');
                option.value = hora;
                option.textContent = hora;
                selectHorario.appendChild(option);
            });
        } else {
            document.getElementById('horariosDiv').style.display = 'none';
        }
    });

    // Lógica para procesar la compra en el formulario
    document.getElementById('comprarBtn').addEventListener('click', () => {
        // Limpiar mensajes de error previos
        document.getElementById('resultado').textContent = '';

        let nombrePelicula = selectPelicula.value;
        let horarioSeleccionado = document.getElementById('horario').value;
        let cantidadEntradas = parseInt(document.getElementById('entradas').value, 10);
        let edad = parseInt(document.getElementById('edad').value, 10);

        // Variable para almacenar los errores
        let errores = [];

        // Validar que se seleccionó una película
        if (!nombrePelicula) {
            errores.push("Por favor, seleccione una película.");
        }

        // Validar que se seleccionó un horario
        if (!horarioSeleccionado) {
            errores.push("Por favor, seleccione un horario.");
        }

        // Validar cantidad de entradas
        if (isNaN(cantidadEntradas) || cantidadEntradas <= 0) {
            errores.push("Por favor, ingrese una cantidad válida de entradas.");
        }

        // Validar edad
        if (isNaN(edad) || edad <= 0) {
            errores.push("Por favor, ingrese una edad válida.");
        }

        // Mostrar errores si los hay
        if (errores.length > 0) {
            document.getElementById('resultado').textContent = errores.join(" ");
            return; // Detener la ejecución si hay errores
        }

        const peliculaSeleccionada = buscarPelicula(nombrePelicula);
        const tieneDescuento = verificarDescuento(edad);
        const costoTotal = calcularCostoTotal(cantidadEntradas, tieneDescuento, peliculaSeleccionada.costo);

        let resultado = `El costo total de sus entradas para ${peliculaSeleccionada.nombre} a las ${horarioSeleccionado} es: $${costoTotal}`;
        if (tieneDescuento) {
            resultado += ". Se aplicó un descuento por edad.";
        }

        document.getElementById('resultado').textContent = resultado;

        const compra = {
            pelicula: nombrePelicula,
            horario: horarioSeleccionado,
            cantidadEntradas: cantidadEntradas,
            costoTotal: costoTotal
        };
        localStorage.setItem('ultimaCompra', JSON.stringify(compra));
    });
});
