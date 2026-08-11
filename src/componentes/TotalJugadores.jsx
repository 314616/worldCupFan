import { useSelector } from 'react-redux';

const TotalJugadores = () => {

    const  cantTotalJugadores  = useSelector((state) => state.jugadores.listaJugadores).length


  return (
    <div className="card p-3 border-0 shadow-sm h-100" style={{ backgroundColor: '#ffffff', borderRadius: '4px', minHeight: '160px'  }}>
      <h2  className="fw-bold m-0" style={{ color: '#0176d3' }}>{cantTotalJugadores}</h2>
      
    </div>
  )
}

export default TotalJugadores
