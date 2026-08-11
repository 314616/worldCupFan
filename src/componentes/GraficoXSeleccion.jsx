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

const GraficoXSeleccion = () => {
    const listaSelecciones = useSelector(state => state.selecciones.listaSelecciones);
    const  listaJugadores  = useSelector((state) => state.jugadores.listaJugadores)

    const listaCantJugadoresPorSeleccion = listaSelecciones.map(sele => ({
        seleccionNombre: sele.nombre,
        cantJugadores: listaJugadores.filter(jugador => String(jugador.idSeleccion) === String(sele.id)).length
    }))

    const eliminarColumnasSinJugadores = listaCantJugadoresPorSeleccion.filter(item => item.cantJugadores > 0)

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
                            text: 'Cantidad de jugadores por Seleccion',
                        },
                    },
                }}
                data={{
                    labels: eliminarColumnasSinJugadores.map(item => item.seleccionNombre),
                    datasets:[
                        {
                            label:'Selecciones',
                            data: eliminarColumnasSinJugadores.map(item => item.cantJugadores),
                            backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        }
                    ]
                }}
            />

        </div>
    )
}

export default GraficoXSeleccion

/* 
Gráfico de jugadores por selección: 
se deberán graficar las selecciones de las que hay jugadores registrados, mostrando la
cantidad por selección. No se muestran en la gráfica las selecciones sin jugadores registrados.
*/