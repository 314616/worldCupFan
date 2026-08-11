import { useEffect, useState, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"

import { cargarJugadores, eliminarJugador } from "../store/slices/jugadoresSlice";
import '../App.css'

const ListadoJugadores = () => {

  const dispatch = useDispatch();
  const listaJugadores  = useSelector((state) => state.jugadores.listaJugadores)


  useEffect(() => {
      fetch('https://worldcupfan.develotion.com/jugadores', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Error de respuesta de la api')
          }
          return response.json()
        })
        .then(data => {
          dispatch(cargarJugadores(data.jugadores))
        })
        .catch(error => {
          console.error('Error al obtener los jugadores:', error)
        })
  }, [])

  const selecciones = useSelector(state => state.selecciones.listaSelecciones);

  /* Filtro Select para tabla */

  // usamos useRef y useState para manejar el valor del select del filtro en cada momento
  const [valorFiltroActual, setValorFiltroActual] = useState("todos");
  const selectorPaisRef = useRef(null);

  // manejarCambioFiltro se llama solo cuando hay cambio en el select
  const manejarCambioFiltro = () => {
    if (selectorPaisRef.current) {
      setValorFiltroActual(selectorPaisRef.current.value);
    }
  };

  // jugadoresAMostrar es la lista que renderiza la tabla, ya sea tenga o no filtros aplicados
  const jugadoresAMostrar = valorFiltroActual === "todos"
    ? listaJugadores
    : listaJugadores.filter(jugador => String(jugador.idSeleccion) === String(valorFiltroActual));

  const mapaEmojis = new Map(
    selecciones.map(seleccion => [String(seleccion.id), seleccion.emoji])
  )

  const obtenerEmojiSelec = (idSeleccion) => {
    const emoji = mapaEmojis.get(String(idSeleccion))
    return emoji
  }

  const eliminarJugadorAux = (id) => {
    console.log('eliminando')
    console.log('id jugador', id)
    if (window.confirm("Seguro desea eliminar el jugador del sistema?")) {
      fetch(`https://worldcupfan.develotion.com/jugadores/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('No se pudo eliminar del server')
          }
          return response.json()
        })
        .then(data => {
          dispatch(eliminarJugador(id))
          console.log('dispatch')
        })
        .catch(error => {
          console.error('Error al obtener las selecciones:', error)
        })

    }
  }
  return (
    <div>
      <div className="d-flex align-items-center justify-content-center my-4">
        <label htmlFor="filtroPais" className="form-label me-2 mb-0 fw-bold text-secondary">Filtrar por Selección: </label>
        <select
          id="filtroPais"
          //value={seleccionFiltrada}
          ref={selectorPaisRef}
          //onChange={() => setActualizarFiltro(!actualizar)}
          onChange={manejarCambioFiltro}
          defaultValue="todos"
          className="form-select form-select-sm rounded-pill text-center border-secondary-subtle focus-ring"
          style={{ width: 'auto', minWidth: '180px', '--bs-focus-ring-color': '#0d6efd' }}
        >
          <option value="todos">Todos los países</option>
          {selecciones.map(pais => (
            <option key={pais.id} value={pais.id}>{pais.emoji} {pais.nombre}</option>
          ))}
        </select>
      </div>
      <table className="table table-bordered table-sm custom-sf-table align-middle">
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th>Nombre</th>
            <th>Posición</th>
            <th>Fecha de nacimiento</th>
            <th>Seleccion</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {jugadoresAMostrar.map((jugador) => (
            // Usamos jugador.id como key única para la fila
            <tr key={jugador.id}>
              <td>{jugador.nombre}</td>
              <td>{jugador.posicion}</td>
              <td>{jugador.fechaNacimiento}</td>
              <td>{obtenerEmojiSelec(jugador.idSeleccion)}</td>
              <td><button type="button" className="btn btn-outline-secondary btn-sm rounded-pill px-3 link-hover-danger"
                style={{ '--bs-btn-hover-bg': '#dc3545', '--bs-btn-hover-border-color': '#dc3545' }} onClick={() => eliminarJugadorAux(jugador.id)}>Eliminar</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ListadoJugadores
