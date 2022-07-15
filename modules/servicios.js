import {
  limpiarCampos,
  remueveClaseAlert,
  agregaClaseAlert,
  actualizarContenido,
} from './dom.js';

async function cargarMonedas(paginaAPI) {
  return fetch(paginaAPI)
    .then((r) => r.json())

    .catch((error) =>
      console.error('falló cargar la tabla, intente nuevamente', error),
    );
}

function cambiarMonedaBaseYFecha(monedasValidas) {
  monedasValidas.push('EUR'); //la api no devuleve EUR
  let nuevaMonedaBase = $('#nueva-moneda').val();
  let nuevaFecha = $('#calendario').val();
  let fechaPorDefault = 'latest';
  const selectorDeMoneda = $('#seleccion-de-moneda');
  let monedaEsValida = 'no';
  if (nuevaFecha != '') {
    fechaPorDefault = nuevaFecha;
  }
  let nuevaPaginaAPI = `https://api.exchangerate.host/${fechaPorDefault}?base=${nuevaMonedaBase}`;

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

export { cargarMonedas, cambiarMonedaBaseYFecha };
