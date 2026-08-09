import { useEffect, useState, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"

import { cargarJugadores, eliminarJugador } from "../store/slices/jugadoresSlice";
import { setContenidoSelecciones } from "../store/slices/seleccionesSlice";


const ListadoJugadores = () => {


  const dispatch = useDispatch();

  const { listaJugadores, cargadosJ } = useSelector((state) => state.jugadores)


  useEffect(() => {
    if (!cargadosJ) {
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

    }
  }, [cargadosJ, dispatch])


  const { listaSelecciones: selecciones = [], cargadosS } = useSelector(state => state.selecciones)

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


  useEffect(() => {
    if (!cargadosS) {
      fetch('https://worldcupfan.develotion.com/selecciones', {
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
          dispatch(setContenidoSelecciones(data.selecciones))
        })
        .catch(error => {
          console.error('Error al obtener las selecciones:', error)
        })
    }
  }, [cargadosS, dispatch])

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
    <div><h2>Listado de Jugadores</h2>
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="filtroPais" style={{ marginRight: '10px', fontWeight: 'bold' }}>Filtrar por Selección: </label>
        <select
          id="filtroPais"
          //value={seleccionFiltrada}
          ref={selectorPaisRef}
          //onChange={() => setActualizarFiltro(!actualizar)}
          onChange={manejarCambioFiltro}
          defaultValue="todos"
        >
          <option value="todos">Todos los países</option>
          {selecciones.map(pais => (
            <option key={pais.id} value={pais.id}>{pais.emoji} {pais.nombre}</option>
          ))}
        </select>
      </div>
      <table border="1" style={{ width: '100%', textAlign: 'left', marginBottom: '20px', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th>Nombre</th>
            <th>Posición</th>
            <th>Fecha de nacimiento</th>
            <th>Seleccion</th>
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
              <td><button type="button" onClick={() => eliminarJugadorAux(jugador.id)}>Eliminar</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ListadoJugadores
