import AgregarJugador from './AgregarJugador'
import ListadoJugadores from './ListadoJugadores'
import PosicionDestacada from './PosicionDestacada'
import SeleccionFavorita from './SeleccionFavorita'

const Dashboard = () => {
    const obtenerPaises = () => {
    fetch('https://worldcupfan.develotion.com/paises', {
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
      console.log(data)
    })
    .catch(error => {
      console.error('Error al obtener los paises:', error)
    })
  }

  return (
    <div>Dashboard

      <button onClick={obtenerPaises}>Get Paises</button>
      <AgregarJugador/>
      <ListadoJugadores/>
      <SeleccionFavorita/>
      <PosicionDestacada/>
    </div>
  )
}

export default Dashboard