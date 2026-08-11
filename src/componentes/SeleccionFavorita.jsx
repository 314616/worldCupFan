import { useSelector } from "react-redux"


const SeleccionFavorita = () => {

  const  listaJugadores  = useSelector((state) => state.jugadores.listaJugadores);
  const  selecciones  = useSelector((state) => state.selecciones.listaSelecciones);


  if (listaJugadores.length === 0) {
    return (
      <div className="card p-3 border-0 shadow-sm text-center" style={{ backgroundColor: '#ffffff', borderRadius: '4px', minHeight: '160px' }}>
        <h5 className="text-secondary mb-1" style={{ fontSize: '14px' }}>Selección Favorita</h5>
        <p className="mb-0 fw-semibold">No hay jugadores registrados</p>
      </div>
    )
  }

  //creamos map para guardar idSeleccion y cantJugadores de esa seleccion
  const conteoSeleccionesMap = new Map()

  listaJugadores.forEach(jugador => {
    const idSel = jugador.idSeleccion
    const cantidadActual = conteoSeleccionesMap.get(idSel) || 0;

    conteoSeleccionesMap.set(idSel, cantidadActual + 1)

  })

  //buscamos seleccion con mas jugadores
  let idSeleccionFav = null;
  let maxJugadores = -1;

  for (const [idSelec, cantidadJug] of conteoSeleccionesMap) {
    if (cantidadJug > maxJugadores) {
      maxJugadores = cantidadJug
      idSeleccionFav = idSelec
    }
  }

  const seleccionFavoritaAMostrar = selecciones.find(seleccion => (seleccion.id) === idSeleccionFav)
  if (!seleccionFavoritaAMostrar) return null;
  return (
    <div className="card p-3 border-0 shadow-sm h-100" style={{ backgroundColor: '#ffffff', borderRadius: '4px', minHeight: '160px'  }}>
      <div className="d-flex align-items-center justify-content-center mt-2">

        <span style={{ fontSize: '2.5rem', marginRight: '12px' }} aria-hidden="true">
          {seleccionFavoritaAMostrar.emoji}
        </span>
        <div className="text-start">
          <p className="mb-0 fw-bold text-dark" style={{ fontSize: '18px', lineHeight: '1.2' }}>
            {seleccionFavoritaAMostrar.nombre}
          </p>
          <small className="text-muted">
            {maxJugadores} {maxJugadores === 1 ? 'jugador registrado' : 'jugadores registrados'}
          </small>
        </div>
      </div>
    </div>
  );
}
export default SeleccionFavorita
