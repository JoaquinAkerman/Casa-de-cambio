///<reference types="jquery"/>

let paginaAPI = "https://api.exchangeratesapi.io/latest";

fetch(paginaAPI)
	.then((respuesta) => respuesta.json())
	.then((respuestaJSON) => {
		$("#fecha").text(`En el día ${respuestaJSON.date}`);
		$(`#descripcion`).text(`1 ${respuestaJSON.base} es igual a:`);

		Object.keys(respuestaJSON.rates).forEach((moneda) => {
			$("#precio").append(
				`<li class="list-group-item">${respuestaJSON.rates[moneda]}</li>`
			);
			$("#moneda").append(`<li class="list-group-item">${moneda}</li>`);
			$("#lista-monedas").append(`<option value="${moneda}">`);

			function monedaSeleccionada() {
				nuevaMoneda = $("#nueva-moneda").val();
				if (nuevaMoneda === moneda) {
					paginaAPI = `https://api.exchangeratesapi.io/latest?base=${nuevaMoneda}`;
				}
			}
			$("#boton-cambiar-moneda").on("click", monedaSeleccionada);
		});
	});
