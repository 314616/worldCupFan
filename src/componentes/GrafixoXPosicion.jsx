import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement } from 'chart.js';
import { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { cargarJugadores } from '../store/slices/jugadoresSlice';
import { useDispatch, useSelector } from 'react-redux';

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
  return (
    <div>GrafixoXPosicion</div>
  )
}

export default GrafixoXPosicion