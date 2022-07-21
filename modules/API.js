import { armarPagina } from './dom.js';
const exchangeURL = 'https://api.exchangerate.host/latest';

async function cargarMonedas(paginaAPI) {
  return fetch(paginaAPI)
    .then((r) => r.json())

    .catch((error) =>
      console.error('falló cargar la tabla, intente nuevamente', error),
    );
}

function inicializar(exchangeURL) {
  cargarMonedas(exchangeURL).then((cambios) => armarPagina(cambios));
}

export { inicializar, cargarMonedas, exchangeURL };
