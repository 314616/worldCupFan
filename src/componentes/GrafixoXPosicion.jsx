import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement
);

const GrafixoXPosicion = () => {
    const listaPosiciones = useSelector(state => state.posiciones.listaPosiciones);
    const  listaJugadores  = useSelector((state) => state.jugadores.listaJugadores)

    const cantTotalJugadores = listaJugadores.length;

    const listaPorcentajeJugadoresPorPosicion = listaPosiciones.map(posicion => {

        const cantidadEnPosicion = listaJugadores.filter(jugador => String(jugador.posicion) === String(posicion.id)).length

        const porcentaje = cantTotalJugadores > 0 ? Number(cantidadEnPosicion / cantTotalJugadores) * 100 : 0;

        return {
            posicionNombre: posicion.nombre,
            porcentaje:porcentaje
        }
    })

    return (
        <div style={{position: 'relative', height: '260px', width: '100%'}}>
            <Bar
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: 'Porcentaje de jugadores por Posicion',
                        },
                    },
                }}
                data={{
                    labels: listaPorcentajeJugadoresPorPosicion.map(item => item.posicionNombre),
                    datasets:[
                        {
                            label:'Posiciones',
                            data: listaPorcentajeJugadoresPorPosicion.map(item => item.porcentaje),
                            backgroundColor: 'rgba(54, 162, 235, 0.5)',
                        }
                    ]
                }}
            />

        </div>
    )
}

export default GrafixoXPosicion

/* 
Gráfico de porcentaje por posición: se deberá graficar el porcentaje de jugadores registrados en cada posición.
*/
