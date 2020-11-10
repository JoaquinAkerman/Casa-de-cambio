"use strict";

///<reference types="jquery"/>
let paginaAPI = "https://api.exchangeratesapi.io/latest";

function cargarAPI() {
	fetch(paginaAPI)
		.then((respuesta) => respuesta.json())
		.then((respuestaJSON) => {
			$("#fecha").text(`En el día ${respuestaJSON.date}`);
			$(`#descripcion`).text(`1 ${respuestaJSON.base} es igual a:`);

			Object.keys(respuestaJSON.rates).forEach((moneda) => {
				$("#precio").append(
					`<li class="list-group-item precio">${respuestaJSON.rates[moneda]}</li>`
				);
				$("#moneda").append(
					`<li class="list-group-item moneda">${moneda}</li>`
				);
				$("#lista-monedas").append(`<option value="${moneda}">`);
			});

			function cambiarMonedaBase() {
				let monedasValidas = Object.keys(respuestaJSON.rates);
				let nuevaMonedaBase = $("#nueva-moneda").val();
				for (let i = 0; i < monedasValidas.length; i++) {
					if (nuevaMonedaBase === monedasValidas[i]) {
						paginaAPI = `https://api.exchangeratesapi.io/latest?base=${nuevaMonedaBase}`;
						$(".precio").remove();
						$(".moneda").remove();
						$("#lista-monedas").html("");
						$("#nueva-moneda").val("");
						cargarAPI();
						respuestaJSON.rates = "";
						console.log("moneda validó correctamente");
						break;
					}
				}
			}
			$("#boton-cambiar-moneda").on("click", cambiarMonedaBase);
		})
		.catch((error) =>
			console.error(
				"falló cargar la tabla, intente más nuevamente",
				error
			)
		);
}

cargarAPI();
