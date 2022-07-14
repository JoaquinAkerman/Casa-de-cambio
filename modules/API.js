import { cargarMonedas } from './servicios.js';
import { armarPagina, mostrarAvisoCargando } from './dom.js';

function inicializar(exchangeURL) {
  mostrarAvisoCargando();
  cargarMonedas(exchangeURL).then((cambios) => armarPagina(cambios));
}

export { inicializar };
