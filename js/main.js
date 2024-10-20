document.addEventListener("DOMContentLoaded", function () {
    const peliculas = [
        { nombre: "Inception", horario: ["14:00", "17:00", "20:00"], costo: 1000 },
        { nombre: "Titanic", horario: ["13:00", "16:00", "19:00"], costo: 1200 },
        { nombre: "Avatar", horario: ["15:00", "18:00", "21:00"], costo: 1500 }
    ];

    const selectPelicula = document.getElementById('pelicula');
    peliculas.forEach(pelicula => {
        const option = document.createElement('option');
        option.value = pelicula.nombre;
        option.textContent = pelicula.nombre;
        selectPelicula.appendChild(option);
    });

    selectPelicula.addEventListener('change', () => {
        const peliculaSeleccionada = peliculas.find(pelicula => pelicula.nombre === selectPelicula.value);
        const selectHorario = document.getElementById('horario');
        selectHorario.innerHTML = '';

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

    document.getElementById('comprarBtn').addEventListener('click', () => {
        let nombrePelicula = selectPelicula.value;
        let horarioSeleccionado = document.getElementById('horario').value;
        let cantidadEntradas = parseInt(document.getElementById('entradas').value, 10);
        let edad = parseInt(document.getElementById('edad').value, 10);

        let errores = [];
        if (!nombrePelicula) errores.push("Por favor, seleccione una película.");
        if (!horarioSeleccionado) errores.push("Por favor, seleccione un horario.");
        if (isNaN(cantidadEntradas) || cantidadEntradas <= 0) errores.push("Por favor, ingrese una cantidad válida de entradas.");
        if (isNaN(edad) || edad <= 0) errores.push("Por favor, ingrese una edad válida.");

        if (errores.length > 0) {
            document.getElementById('resultado').textContent = errores.join(" ");
            return;
        }

        const peliculaSeleccionada = peliculas.find(pelicula => pelicula.nombre === nombrePelicula);
        const tieneDescuento = edad < 12 || edad >= 65;
        const costoTotal = cantidadEntradas * peliculaSeleccionada.costo * (tieneDescuento ? 0.8 : 1);

        let resultado = `El costo total de sus entradas para ${peliculaSeleccionada.nombre} a las ${horarioSeleccionado} es: $${costoTotal}`;
        if (tieneDescuento) resultado += ". Se aplicó un descuento por edad.";

        document.getElementById('resultado').textContent = resultado;

        // Guardar los detalles de la compra en localStorage
        const compra = {
            pelicula: nombrePelicula,
            horario: horarioSeleccionado,
            cantidadEntradas: cantidadEntradas,
            costoTotal: costoTotal
        };
        localStorage.setItem('ultimaCompra', JSON.stringify(compra));
    });

    // Recuperar y mostrar la última compra guardada en localStorage
    const ultimaCompra = JSON.parse(localStorage.getItem('ultimaCompra'));
    if (ultimaCompra) {
        const { pelicula, horario, cantidadEntradas, costoTotal } = ultimaCompra;
        const mensajeUltimaCompra = `Última compra: ${cantidadEntradas} entradas para "${pelicula}" a las ${horario}, total: $${costoTotal}`;
        document.getElementById('ultimaCompra').textContent = mensajeUltimaCompra;
    }
});
