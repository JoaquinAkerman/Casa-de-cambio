import { cambiarMonedaBaseYFecha } from './servicios.js';

function mostrarDiaYMoneda(dia, moneda) {
  $('#fecha').text(`En el día ${dia}`);
  $('#descripcion').text(`1 ${moneda} es igual a:`);
}

function definirFechaMaximaCalendario() {
  let fechaActual = new Date().toISOString().split('T');
  const calendario = $('#calendario');
  calendario.attr('max', fechaActual[0]);
}

function armarTablaDeCambios(monedasYPrecio) {
  Object.keys(monedasYPrecio)
    .sort()
    .forEach(function (item) {
      $('#moneda').append(`<li class="list-group-item moneda">${item}</li>`);
      $('#precio').append(
        `<li class="list-group-item precio">${monedasYPrecio[item]}</li>`,
      );
      $('#lista-monedas').append(`<option value="${item}">`);
    });
}

function limpiarCampos() {
  $('.precio').remove();
  $('.moneda').remove();
  $('#lista-monedas').html('');
}
function remueveClaseAlert(input) {
  input.removeClass('alert');
  input.removeClass('alert-danger');
}
function agregaClaseAlert(input) {
  input.addClass('alert');
  input.addClass('alert-danger');
}

function actualizarContenido(monedasJSON) {
  mostrarDiaYMoneda(monedasJSON.date, monedasJSON.base);
  definirFechaMaximaCalendario();
  armarTablaDeCambios(monedasJSON.rates);
}

function mostrarAvisoCargando() {
  const $divCargando = document.querySelector('#imagen-cargando');
  $divCargando.classList.remove('oculto');
}

function ocultarAvisoCargando() {
  const $divCargando = document.querySelector('#imagen-cargando');
  $divCargando.classList.add('oculto');
}

function armarPagina(monedasJSON) {
  mostrarDiaYMoneda(monedasJSON.date, monedasJSON.base);
  definirFechaMaximaCalendario();
  armarTablaDeCambios(monedasJSON.rates);
  $('#boton-actualizar-tabla').on('click', () => {
    console.log('me cliquearon');
    cambiarMonedaBaseYFecha(Object.keys(monedasJSON.rates));
  });
  ocultarAvisoCargando();
}

export {
  mostrarAvisoCargando,
  armarPagina,
  limpiarCampos,
  remueveClaseAlert,
  agregaClaseAlert,
  actualizarContenido,
};
