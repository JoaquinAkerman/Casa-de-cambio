"use strict";

///<reference types="jquery"/>
let paginaAPI = "https://api.exchangeratesapi.io/latest";

function mostrarDiaYMoneda(dia, moneda) {
	$("#fecha").text(`En el día ${dia}`);
	$(`#descripcion`).text(`1 ${moneda} es igual a:`);
}

function armarTablaDeCambios(monedas, precio) {
	for (let i = 0; i < monedas.length; i++) {
		$("#moneda").append(
			`<li class="list-group-item moneda">${monedas[i]}</li>`
		);
		$("#precio").append(
			`<li class="list-group-item precio">${precio[i]}</li>`
		);
		$("#lista-monedas").append(`<option value="${monedas[i]}">`);
	}
}

function cambiarMonedaBase(monedasValidas) {
	let nuevaMonedaBase = $("#nueva-moneda").val();
	console.log("me hicieron click");
	for (let i = 0; i < monedasValidas.length; i++) {
		if (nuevaMonedaBase === monedasValidas[i]) {
			paginaAPI = `https://api.exchangeratesapi.io/latest?base=${nuevaMonedaBase}`;
			$(".precio").remove();
			$(".moneda").remove();
			$("#lista-monedas").html("");
			$("#nueva-moneda").val("");
			cargarMonedas();
			respuestaJSON.rates = "";
			console.log("moneda validó correctamente");
			break;
		}
	}
}

function cargarMonedas() {
	fetch(paginaAPI)
		.then((respuesta) => respuesta.json())
		.then((respuestaJSON) => {
			mostrarDiaYMoneda(respuestaJSON.date, respuestaJSON.base);
			armarTablaDeCambios(
				Object.keys(respuestaJSON.rates),
				Object.values(respuestaJSON.rates)
			);
			$("#boton-cambiar-moneda").on(
				"click",
				cambiarMonedaBase(respuestaJSON.rates)
			);
		})

		.catch((error) =>
			console.error(
				"falló cargar la tabla, intente más nuevamente",
				error
			)
		);
}

cargarMonedas();
