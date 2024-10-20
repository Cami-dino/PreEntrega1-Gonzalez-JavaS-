document.addEventListener('DOMContentLoaded', () => {
    const peliculas = [
        { nombre: "Inception", costo: 1000 },
        { nombre: "Titanic", costo: 1200 },
        { nombre: "Avatar", costo: 1500 }
    ];

    const horariosComunes = ["14:00", "17:00", "20:00"];


    function buscarPelicula(nombrePelicula) {
        return peliculas.find(pelicula => pelicula.nombre === nombrePelicula);
    }


    const selectPelicula = document.getElementById('pelicula');
    peliculas.forEach(pelicula => {
        const option = document.createElement('option');
        option.value = pelicula.nombre;
        option.textContent = pelicula.nombre;
        selectPelicula.appendChild(option);
    });


    selectPelicula.addEventListener('change', () => {
        const peliculaSeleccionada = buscarPelicula(selectPelicula.value);
        const selectHorario = document.getElementById('horario');
        selectHorario.innerHTML = ''; // Limpiar los horarios previos

        if (peliculaSeleccionada) {
            document.getElementById('horariosDiv').style.display = 'block';
            horariosComunes.forEach(hora => {
                const option = document.createElement('option');
                option.value = hora;
                option.textContent = hora;
                selectHorario.appendChild(option);
            });
        } else {
            document.getElementById('horariosDiv').style.display = 'none';
        }
    });


    document.getElementById('comprarBtn').addEventListener('click', () => {
        // Limpiar mensajes previos
        document.getElementById('resultado').textContent = '';
        document.getElementById('mensajeCosto').textContent = '';
        document.getElementById('mensajeDescuento').textContent = '';

        let nombrePelicula = selectPelicula.value;
        let horarioSeleccionado = document.getElementById('horario').value;
        let cantidadEntradas = parseInt(document.getElementById('entradas').value, 10);
        let edad = parseInt(document.getElementById('edad').value, 10);

        let errores = [];


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


        if (errores.length > 0) {
            document.getElementById('resultado').textContent = errores.join(" ");
            return; // Detener la ejecución si hay errores
        }

        const peliculaSeleccionada = buscarPelicula(nombrePelicula);
        const tieneDescuento = (edad < 12 || edad >= 65);
        const costoTotal = calcularCostoTotal(cantidadEntradas, tieneDescuento, peliculaSeleccionada.costo);


        document.getElementById('mensajeCosto').textContent = `El costo total de sus entradas es: $${costoTotal}`;

        if (tieneDescuento) {
            document.getElementById('mensajeDescuento').textContent = "Se aplicó un descuento por edad.";
        }


        const compra = {
            pelicula: nombrePelicula,
            horario: horarioSeleccionado,
            cantidadEntradas: cantidadEntradas,
            costoTotal: costoTotal
        };
        localStorage.setItem('ultimaCompra', JSON.stringify(compra));

        const ultimaCompra = JSON.parse(localStorage.getItem('ultimaCompra'));
        if (ultimaCompra) {
            console.log(`Última compra: ${ultimaCompra.cantidadEntradas} entradas para ${ultimaCompra.pelicula} a las ${ultimaCompra.horario}. Total: $${ultimaCompra.costoTotal}.`);
        }
    });

    // Función para calcular el costo total de las entradas
    function calcularCostoTotal(cantidadEntradas, tieneDescuento, costoEntrada) {
        let costoTotal = cantidadEntradas * costoEntrada;
        if (tieneDescuento) {
            costoTotal *= 0.8; // Aplicar un 20% de descuento
        }
        return costoTotal;
    }
});
