import {
  cambiarMonedaBaseYFecha,
  cargarMonedasDesdeTabla,
} from './servicios.js';
function mostrarDiaYMoneda(dia, moneda, monedasJSON) {
  const $monedaEnCabeceraDeTabla = document.querySelector(
    '#moneda-en-cabecera',
  );
  const $precioEnCabeceraDeTabla = document.querySelector(
    '#precio-en-cabecera',
  );
  $precioEnCabeceraDeTabla.innerText = `Precio en ${moneda}`;
  const $descripcion = document.querySelector('#descripcion');
  const $fecha = document.querySelector('#fecha');
  $descripcion.textContent = '';
  $fecha.textContent = `En el día ${dia}`;
  const imagenBanderaMonedaActiva = document.createElement('span');
  imagenBanderaMonedaActiva.id = 'bandera-moneda';
  $descripcion.append(imagenBanderaMonedaActiva);
  $descripcion.append(` 1 ${moneda} es igual a ${monedasJSON.USD} dólares `);
  const banderaMonedaDolar = document.createElement('span');
  banderaMonedaDolar.classList = 'fi fi-us';
  banderaMonedaDolar.id = 'bandera-moneda-dolar';
  $descripcion.append(banderaMonedaDolar);
  mostrarBanderaMonedaActivaYSeteaValue(moneda);
}

function definirFechaMaximaCalendario() {
  let fechaActual = new Date().toISOString().split('T');
  const calendario = $('#calendario');
  calendario.attr('max', fechaActual[0]);
  calendario.attr('value', fechaActual[0]);
  calendario.attr('min', '2000-01-01');
}
function armarTablaDeCambios(monedasYPrecio) {
  const $resultados = document.querySelector('#resultados');
  const $filaMoneda = $('#moneda');
  const $filaPrecio = $('#precio');
  const $listaMonedas = $('#nueva-moneda');
  if (monedasYPrecio == undefined) {
    $resultados.textContent = 'sucedió un error, vamos a intentar nuevamente';
    $resultados.classList = 'resaltar';
    document.querySelector('#calendario').valueAsDate = new Date();
    setTimeout(function () {
      location.reload();
    }, 2000);
  }
  Object.keys(monedasYPrecio)
    .sort()
    .forEach((item) => {
      const botonMoneda = document.createElement('button');
      botonMoneda.innerText = item;
      botonMoneda.classList = ' list-group-item moneda ';
      botonMoneda.value = item;
      botonMoneda.id = item;

      botonMoneda.addEventListener('click', () => {
        cargarMonedasDesdeTabla(`${botonMoneda.value}`);
      });
      $filaMoneda.append(botonMoneda);
      const precio = document.createElement('li');
      precio.classList = 'list-group-item precio';
      precio.innerText = `${monedasYPrecio[item]}`;
      $filaPrecio.append(precio);
      const opcionMoneda = document.createElement('option');
      opcionMoneda.innerText = `${item}`;
      opcionMoneda.value = item;
      $listaMonedas.append(opcionMoneda);
    });
}

function limpiarCampos() {
  $('.precio').remove();
  $('.moneda').remove();
  $('#nueva-moneda').html('');
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
  definirFechaMaximaCalendario();
  armarTablaDeCambios(monedasJSON.rates);
  mostrarDiaYMoneda(monedasJSON.date, monedasJSON.base, monedasJSON.rates);
}

async function armarPagina(monedasJSON) {
  mostrarDiaYMoneda(monedasJSON.date, monedasJSON.base, monedasJSON.rates);
  definirFechaMaximaCalendario();
  armarTablaDeCambios(monedasJSON.rates);
  $('#boton-actualizar-tabla').on('click', () => {
    cambiarMonedaBaseYFecha(Object.keys(monedasJSON.rates));
  });
}
function mostrarBanderaMonedaActivaYSeteaValue(valueDeMoneda) {
  const $selectorDeMoneda = document.querySelector('#nueva-moneda');
  $selectorDeMoneda.value = valueDeMoneda;
  const $banderaDeMoneda = document.querySelector('#bandera-moneda');
  if (valueDeMoneda === 'BTC') {
    $banderaDeMoneda.classList = '';
  } else {
    const codigoDeBandera = valueDeMoneda.substring(0, 2).toLowerCase();
    $banderaDeMoneda.classList = `fi fi-${codigoDeBandera}`;
  }
}

export {
  armarPagina,
  limpiarCampos,
  remueveClaseAlert,
  agregaClaseAlert,
  actualizarContenido,
};
