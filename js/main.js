document.addEventListener("DOMContentLoaded", function () {
    const selectPelicula = document.getElementById('pelicula');
    const selectHorario = document.getElementById('horario');
    const resultadoDiv = document.getElementById('resultado');
    const comprarBtn = document.getElementById('comprarBtn');
    
    const peliculas = [
        { nombre: "Inception", costo: 1000 },
        { nombre: "Titanic", costo: 1200 },
        { nombre: "Avatar", costo: 1500 }
    ];

    // Horarios comunes para todas las películas
    const horariosComunes = ["14:00", "17:00", "20:00"];

    // Poblar select de películas
    peliculas.forEach(pelicula => {
        const option = document.createElement('option');
        option.value = pelicula.nombre;
        option.textContent = pelicula.nombre;
        selectPelicula.appendChild(option);
    });

    // Evento para mostrar horarios cuando se selecciona una película
    selectPelicula.addEventListener('change', () => {
        selectHorario.innerHTML = ''; // Limpiar los horarios previos
        if (selectPelicula.value) {
            horariosComunes.forEach(hora => {
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

    // Evento para manejar la compra
    comprarBtn.addEventListener('click', () => {
        // Limpiar el mensaje de resultado
        resultadoDiv.textContent = '';

        // Obtener los valores seleccionados
        const nombrePelicula = selectPelicula.value;
        const horarioSeleccionado = selectHorario.value;
        const cantidadEntradas = parseInt(document.getElementById('entradas').value, 10);
        const edad = parseInt(document.getElementById('edad').value, 10);

        let errores = [];

        // Validaciones
        if (!nombrePelicula) {
            errores.push("Por favor, seleccione una película.");
        }

        if (!horarioSeleccionado) {
            errores.push("Por favor, seleccione un horario.");
        }

        if (isNaN(cantidadEntradas) || cantidadEntradas <= 0) {
            errores.push("Por favor, ingrese una cantidad válida de entradas.");
        }

        if (isNaN(edad) || edad <= 0) {
            errores.push("Por favor, ingrese una edad válida.");
        }

        // Si hay errores, los mostramos y salimos
        if (errores.length > 0) {
            resultadoDiv.textContent = errores.join(" ");
            return;
        }

        // Buscar la película seleccionada
        const peliculaSeleccionada = peliculas.find(pelicula => pelicula.nombre === nombrePelicula);

        // Verificar si aplica descuento
        const tieneDescuento = edad < 12 || edad >= 65;
        const costoTotal = cantidadEntradas * peliculaSeleccionada.costo * (tieneDescuento ? 0.8 : 1);

        // Mostrar el costo total
        let resultado = `El costo total de sus entradas para ${peliculaSeleccionada.nombre} a las ${horarioSeleccionado} es: $${costoTotal}`;
        if (tieneDescuento) {
            resultado += ". Se aplicó un descuento por edad.";
        }
        resultadoDiv.textContent = resultado;

        // Guardar la compra en localStorage
        const compra = {
            pelicula: nombrePelicula,
            horario: horarioSeleccionado,
            cantidadEntradas: cantidadEntradas,
            costoTotal: costoTotal
        };
        localStorage.setItem('ultimaCompra', JSON.stringify(compra));
    });

    // Mostrar la última compra almacenada en LocalStorage
    const ultimaCompra = JSON.parse(localStorage.getItem('ultimaCompra'));
    if (ultimaCompra) {
        const { pelicula, horario, cantidadEntradas, costoTotal } = ultimaCompra;
        const mensajeUltimaCompra = `Última compra: ${cantidadEntradas} entradas para "${pelicula}" a las ${horario}, total: $${costoTotal}`;
        document.getElementById('ultimaCompra').textContent = mensajeUltimaCompra;
    }
});
