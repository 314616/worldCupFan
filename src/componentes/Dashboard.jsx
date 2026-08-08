import AgregarJugador from './AgregarJugador'
import ListadoJugadores from './ListadoJugadores'

const Dashboard = () => {
    const obtenerPaises = () => {
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
    </div>
  )
}

export default Dashboard