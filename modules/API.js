import { cargarMonedas } from './servicios.js';
import { armarPagina } from './dom.js';

function inicializar(exchangeURL) {
  cargarMonedas(exchangeURL).then((cambios) => armarPagina(cambios));
}

export { inicializar };
