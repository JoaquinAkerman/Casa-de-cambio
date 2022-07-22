import {
  limpiarCampos,
  remueveClaseAlert,
  agregaClaseAlert,
  actualizarContenido,
} from './dom.js';

import { cargarMonedas } from './API.js';

function cambiarMonedaBaseYFecha(monedasValidas) {
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

async function cargarMonedasDesdeTabla(valueBotonClickeado) {
  const $selectorDeMoneda = document.querySelector('#nueva-moneda');
  const $botonActualizar = document.querySelector('#boton-actualizar-tabla');
  $selectorDeMoneda.value = `${valueBotonClickeado}`;
  $botonActualizar.click();
}

export { cambiarMonedaBaseYFecha, cargarMonedasDesdeTabla };
