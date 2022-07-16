import { cambiarMonedaBaseYFecha } from './servicios.js';

function mostrarDiaYMoneda(dia, moneda) {
  $('#fecha').text(`En el día ${dia}`);
  $('#descripcion').text(`1 ${moneda} es igual a:`);
}

function seleccionarMoneda(moneda) {}

function definirFechaMaximaCalendario() {
  let fechaActual = new Date().toISOString().split('T');
  const calendario = $('#calendario');
  calendario.attr('max', fechaActual[0]);
}

function armarTablaDeCambios(monedasYPrecio) {
  Object.keys(monedasYPrecio)
    //.sort()
    .forEach(function (item) {
      //$('#moneda').append(`<li class="list-group-item moneda">${item}</li>`);
      $('#moneda').append(
        `<button class="list-group-item moneda">${item}</button>`,
      );
      $('#precio').append(
        `<li class="list-group-item precio">${monedasYPrecio[item]}</li>`,
      );
      $('#lista-monedas').append(`<option value="${item}">`);
    });
}

//  <button></button>

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
  if ((monedasJSON.succes = true)) {
    console.log('se cargo todo ok');
  }
}

async function armarPagina(monedasJSON) {
  mostrarDiaYMoneda(monedasJSON.date, monedasJSON.base);
  definirFechaMaximaCalendario();
  armarTablaDeCambios(monedasJSON.rates);
  $('#boton-actualizar-tabla').on('click', () => {
    cambiarMonedaBaseYFecha(Object.keys(monedasJSON.rates));
  });
}

export {
  armarPagina,
  limpiarCampos,
  remueveClaseAlert,
  agregaClaseAlert,
  actualizarContenido,
};
