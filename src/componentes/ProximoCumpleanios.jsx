import { useSelector } from 'react-redux';

const ProximoCumpleanios = () => {
  const  listadoJugadores  = useSelector((state) => state.jugadores.listaJugadores)

    if (listadoJugadores.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-muted mb-0 fw-semibold" style={{ fontSize: '14px' }}>
          No hay jugadores registrados.
        </p>
      </div>
    );
  }

  /*const jugador proximoCumple = listadoJugadores.map(() => {

  })*/


  return (
    <div>ProximoCumpleanios PlaceHolder</div>
  )
}

export default ProximoCumpleanios