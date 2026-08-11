import AgregarJugador from './AgregarJugador'
import GraficoXSeleccion from './GraficoXSeleccion'
import GrafixoXPosicion from './GrafixoXPosicion'
import ListadoJugadores from './ListadoJugadores'
import PosicionDestacada from './PosicionDestacada'
import ProximoCumpleanios from './ProximoCumpleanios'
import SeleccionFavorita from './SeleccionFavorita'
import TotalJugadores from './TotalJugadores'

const Dashboard = () => {

  return (
    <div style={{ backgroundColor: '#f3f3f2', minHeight: '100vh', paddingTop: '20px' }}>
      <div className="container-fluid px-4">
        <div className="row g-4"> 
          
          {/* columna izq (ancho 4) */}
          <div className="col-12 col-lg-4 d-flex flex-column gap-3">
            
            <div className="card border-light rounded-1 shadow-sm bg-white p-4" style={{ minHeight: '350px' }}>
              <h5 className="text-secondary fw-semibold text-uppercase fs-6 mb-3">Formulario Agregar Jugador</h5>
              <AgregarJugador/>
            </div>

            {/* Próximos Cumpleaños */}
            <div className="card border-light rounded-1 shadow-sm bg-white p-4 flex-grow-1" style={{ minHeight: '400px' }}>
              <h5 className="text-secondary fw-semibold text-uppercase fs-6 mb-3">Próximos Cumpleaños</h5>
              <ProximoCumpleanios/>
            </div>

          </div>

          {/* col derecha (ancho 8) */}
          <div className="col-12 col-lg-8 d-flex flex-column gap-4">
            
            {/* fila de componentes tarjetas, selfav y posDestacada */}
            <div className="row g-3">
              <div className="col-12 col-md-4">
                <div className="card border-light rounded-1 shadow-sm bg-white p-3 text-center">
                  <h5 className="text-secondary fw-semibold text-uppercase fs-6 mb-1">Cantidad Total de Jugadores</h5>
                  <TotalJugadores/>
                </div>
              </div>
              
              {/* Posición Destacada */}
              <div className="col-12 col-md-4">
                <div className="card border-light rounded-1 shadow-sm bg-white p-3 text-center">
                  <h5 className="text-secondary fw-semibold text-uppercase fs-6 mb-1">Posición Destacada</h5>
                  <PosicionDestacada/>
                </div>
              </div>

              {/* Selección Favorita */}
              <div className="col-12 col-md-4">
                <div className="card border-light rounded-1 shadow-sm bg-white p-3 text-center">
                  <h5 className="text-secondary fw-semibold text-uppercase fs-6 mb-1">Selección Favorita</h5>
                  <SeleccionFavorita/>
                </div>
              </div>
            </div>

            {/* Grafica Cantidad x Seleccion */}
            <div className="card border-light rounded-1 shadow-sm bg-white p-4">
              <h5 className="text-secondary fw-semibold text-uppercase fs-6 mb-3">Gráfica de Cantidad de Jugadores por Selección</h5>
              <GraficoXSeleccion/>
            </div>

            {/* Grafica Porcentaje x Posicion */}
            <div className="card border-light rounded-1 shadow-sm bg-white p-4">
              <h5 className="text-secondary fw-semibold text-uppercase fs-6 mb-3">Gráfica de Porcentaje de Jugadores Posición</h5>
              <GrafixoXPosicion/>
            </div>

            {/* Tabla Principal de Jugadores */}
            <div className="card border-light rounded-1 shadow-sm bg-white p-4">
              <h5 className="text-secondary fw-semibold text-uppercase fs-6 mb-3">Listado de Jugadores</h5>
              <ListadoJugadores/>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;