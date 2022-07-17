import {
  limpiarCampos,
  remueveClaseAlert,
  agregaClaseAlert,
  actualizarContenido,
} from './dom.js';

import { cargarMonedas, inicializar } from './API.js';

function cambiarMonedaBaseYFecha(monedasValidas) {
  console.log(monedasValidas);
  const nuevaMonedaBase = $('#nueva-moneda').val();
  const nuevaFecha = $('#calendario').val();
  let fechaPorDefault = 'latest';
  const selectorDeMoneda = $('#seleccion-de-moneda');

  let monedaEsValida = 'no';
  if (nuevaFecha != '') {
    fechaPorDefault = nuevaFecha;
  }
  const nuevaPaginaAPI = `https://api.exchangerate.host/${fechaPorDefault}?base=${nuevaMonedaBase}`;

  for (let i = 0; i < monedasValidas.length; i++) {
    if (nuevaMonedaBase === monedasValidas[i]) {
      monedaEsValida = 'si';
      limpiarCampos();
      cargarMonedas(nuevaPaginaAPI).then((cambios) =>
        actualizarContenido(cambios),
      );
      remueveClaseAlert(selectorDeMoneda);
      break;
    } else if (nuevaMonedaBase === '') {
      monedaEsValida = 'si';
      limpiarCampos();
      cargarMonedas(nuevaPaginaAPI).then((cambios) =>
        actualizarContenido(cambios),
      );
      remueveClaseAlert(selectorDeMoneda);
      break;
    }
  }
  if (monedaEsValida === 'no') {
    agregaClaseAlert(selectorDeMoneda);
  }
}

function cargarMonedasDesdeTabla(valueBotonClickeado) {
  const $listaMonedas = $('#lista-monedas');
  const $selectorDeMoneda = $('#seleccion-de-moneda');
  const nuevaMonedaBase = valueBotonClickeado;
  const nuevaFecha = $('#calendario').val();
  let fechaPorDefault = 'latest';
  if (nuevaFecha != '') {
    fechaPorDefault = nuevaFecha;
  }
  const nuevaPaginaAPI = `https://api.exchangerate.host/${fechaPorDefault}?base=${nuevaMonedaBase}`;
  limpiarCampos();
  remueveClaseAlert($selectorDeMoneda);
  inicializar(nuevaPaginaAPI);
}

export { cambiarMonedaBaseYFecha, cargarMonedasDesdeTabla };
