"use strict";

`/// <reference types="jquery" />`;

let paginaAPI = "https://api.exchangeratesapi.io/latest";

function mostrarDiaYMoneda(dia, moneda) {
	$("#fecha").text(`En el día ${dia}`);
	$("#descripcion").text(`1 ${moneda} es igual a:`);
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

function definirFechaMaximaCalendario() {
	let fechaActual = new Date().toISOString().split("T");
	const calendario = $("#calendario");
	calendario.attr("max", fechaActual[0]);
}

function cargarMonedas(paginaAPI) {
	return fetch(paginaAPI)
		.then((r) => r.json())

		.catch((error) =>
			console.error("falló cargar la tabla, intente nuevamente", error)
		);
}

function cambiarMonedaBaseYFecha(monedasValidas) {
	monedasValidas.push("EUR"); //la api no devuleve EUR
	let nuevaMonedaBase = $("#nueva-moneda").val();
	let nuevaFecha = $("#calendario").val();
	let fechaPorDefault = "latest";
	const selectorDeMoneda = $("#seleccion-de-moneda");
	let monedaEsValida = "no";
	if (nuevaFecha != "") {
		fechaPorDefault = nuevaFecha;
	}

	for (let i = 0; i < monedasValidas.length; i++) {
		if (nuevaMonedaBase === monedasValidas[i]) {
			paginaAPI = `https://api.exchangeratesapi.io/${fechaPorDefault}?base=${nuevaMonedaBase}`;
			$(".precio").remove();
			$(".moneda").remove();
			$("#lista-monedas").html("");
			monedaEsValida = "si";
			actualizarPagina();
			remueveClaseAlert(selectorDeMoneda);
			break;
		} else if (nuevaMonedaBase === "") {
			nuevaMonedaBase = "EUR";
			paginaAPI = `https://api.exchangeratesapi.io/${fechaPorDefault}?base=${nuevaMonedaBase}`;
			$(".precio").remove();
			$(".moneda").remove();
			$("#lista-monedas").html("");
			monedaEsValida = "si";
			actualizarPagina();
			remueveClaseAlert(selectorDeMoneda);
			break;
		}
	}
	if (monedaEsValida === "no") {
		agregaClaseAlert(selectorDeMoneda);
	}
}

function remueveClaseAlert(input) {
	input.removeClass("alert");
	input.removeClass("alert-danger");
}
function agregaClaseAlert(input) {
	input.addClass("alert");
	input.addClass("alert-danger");
}

function armarPagina(monedasJSON) {
	mostrarDiaYMoneda(monedasJSON.date, monedasJSON.base);
	definirFechaMaximaCalendario();
	armarTablaDeCambios(
		Object.keys(monedasJSON.rates),
		Object.values(monedasJSON.rates)
	);
	console.log(monedasJSON.rates);
	$("#boton-actualizar-tabla").on("click", () => {
		cambiarMonedaBaseYFecha(Object.keys(monedasJSON.rates));
	});
}

function inicializar() {
	cargarMonedas(paginaAPI).then((cambios) => armarPagina(cambios));
}

function actualizarPagina() {
	cargarMonedas(paginaAPI).then((cambios) => actualizarContenido(cambios));
}
function actualizarContenido(monedasJSON) {
	//copié la función Armarpagina, sin el comportamiento del boton actualizar-tabla, para que no corra 2 veces
	mostrarDiaYMoneda(monedasJSON.date, monedasJSON.base);
	definirFechaMaximaCalendario();
	armarTablaDeCambios(
		Object.keys(monedasJSON.rates),
		Object.values(monedasJSON.rates)
	);
}

inicializar();
