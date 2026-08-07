import { useRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setContenidoPaises } from '../store/slices/paisesSlice'
import { setContenidoPosiciones } from '../store/slices/posicionesSlice'
import { setLoading } from '../store/slices/spinnerSlice'
import { agregarJugador } from '../store/slices/jugadoresSlice'
import Spinner from './Spinner'


const AgregarJugador = () => {

    const nombreJ = useRef(null)
    const seleccionJ = useRef(null)
    const posicionJ = useRef(null)
    const fechaNacJ = useRef(null)

    const [botonAgregar, setBotonAgregar] = useState(false)
    const [mensajeExito, setMensajeExito] = useState('')
    const [mensajeError, setMensajeError] = useState('')

    const cambioInputs = () => {
        nombreJ.current.value && seleccionJ.current.value && posicionJ.current.value && fechaNacJ.current.value ? setBotonAgregar(true) : setBotonAgregar(false);
    }

    const dispatch = useDispatch();
    const usuarioLoading = useSelector(state => state.spinner.isLoading)
    const { listaPaises: paises = [], cargados } = useSelector(state => state.paises)

    useEffect(() => {
        if (!cargados) {
            fetch('https://worldcupfan.develotion.com/paises', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error de respuesta de la api')
                    }
                    return response.json()
                })
                .then(data => {
                    dispatch(setContenidoPaises(data.paises))
                })
                .catch(error => {
                    console.error('Error al obtener los paises:', error)
                })

        }
    }, [cargados, dispatch])

    const { listaPosiciones: posiciones = [], cargadosPosiciones } = useSelector(state => state.posiciones)

    useEffect(() => {
        if (!cargadosPosiciones) {
            fetch('https://worldcupfan.develotion.com/posiciones', {
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
                    dispatch(setContenidoPosiciones(data.posiciones))
                })
                .catch(error => {
                    console.error('Error al obtener las posiciones', error)
                })
        }
    }, [cargadosPosiciones, dispatch])

    const agregarJugadorNew = () => {
        console.log('agregando jugador')
        dispatch(setLoading(true))
        setBotonAgregar(false)
        const bodyData = {
            idSeleccion: seleccionJ.current.value,
            nombre: nombreJ.current.value,
            posicion: posicionJ.current.value,
            fechaNacimiento: fechaNacJ.current.value
        }
        if (fechaNacJ.current.value >= hoy) {
            setMensajeError('La fecha ingresada tiene que ser menor a la fecha actual');
            console.log(mensajeError)
            dispatch(setLoading(false))
            setTimeout(() => {
                setMensajeError('');
            }, 3000)
        } else {
            console.log(bodyData)
            fetch('https://worldcupfan.develotion.com/jugadores', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(bodyData)

            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error de respuesta de la api')
                    } else {
                        return response.json()
                    }
                })
                .then(data => {
                    if (data) {
                        dispatch(agregarJugador(data));
                        setMensajeExito('Jugador agregado exitosamente!')

                        setTimeout(() => {
                            setMensajeExito('');
                        }, 5000)
                        seleccionJ.current.value = '';
                        nombreJ.current.value = null;
                        posicionJ.current.value = '';
                        fechaNacJ.current.value = null;
                    }
                })
                .catch(error => {
                    console.error('Error al registrar:', error)

                })
                .finally(() => {
                    dispatch(setLoading(false))
                    //setBotonRegistro(true)
                })
        }

    }
    const hoy = new Date().toISOString().split('T')[0];
    return (
        <div id="agregarJugador" className="">
            <h2>Agregar Jugador</h2>
            <form>
                {/* Select Selecciones */}
                <div className="mb-3">
                    <label htmlFor="seleccion" className="form-label text-secondary" style={{ fontSize: '13px' }}>Pais:</label>
                    <select id="seleccion" className="form-select py-2" ref={seleccionJ} onChange={cambioInputs} defaultValue="" style={{ borderRadius: '4px', fontSize: '15px', color: '#4f4f4f' }} >
                        <option value="" disabled>Seleccione un pais</option>
                        {paises.map(pais => (
                            <option key={pais.id} value={pais.id}>{pais.nombre}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="nombre">Nombre Completo</label>
                    <input type="text" id='nombre' placeholder="Ingrese el nombre del Jugador" ref={nombreJ} onChange={cambioInputs} />
                </div>
                {/* Select Posiciones */}
                <div>
                    <label htmlFor="posiciones" className="form-label text-secondary" style={{ fontSize: '13px' }}>Posicion:</label>
                    <select id="posiciones" className="form-select py-2" ref={posicionJ} onChange={cambioInputs} defaultValue="" style={{ borderRadius: '4px', fontSize: '15px', color: '#4f4f4f' }} >
                        <option value="" disabled>Seleccione una posicion</option>
                        {posiciones.map(posicion => (
                            <option key={posicion.id} value={posicion.id}>{posicion.nombre}</option>
                        ))}
                    </select>
                </div>
                {/* Input Fecha Nacimiento*/}
                <div>
                    <label htmlFor='fechaNac' ></label>
                    <input type='date' id='fechaNac' max={hoy} placeholder="Ingrese la fecha de nacimiento del jugador" ref={fechaNacJ} onChange={cambioInputs} />
                </div>

                <button type='button' className='btn w-100 py-2 fw-semibold text-white position-relative' onClick={agregarJugadorNew} disabled={!botonAgregar} style={{ backgroundColor: '#0176d3', borderColor: '#0176d3', borderRadius: '4px', fontSize: '15px' }}> Agregar</button>
                <div style={{ minHeight: '35px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="mt-2">
                    {/* Si está cargando, muestra el Spinner */}
                    {usuarioLoading && <Spinner />}

                    {/* Si no está cargando y hay un mensaje de éxito, muestra la alerta */}
                    {!usuarioLoading && mensajeExito && (
                        <div className="alert alert-success py-1 px-3 mb-0" style={{ fontSize: '14px', borderRadius: '4px' }}>
                            {mensajeExito}
                        </div>
                    )}
                    {/* Si no está cargando y hay un mensaje de error, muestra la alerta roja */}
                    {!usuarioLoading && mensajeError && (
                        <div className="alert alert-danger py-1 px-3 mb-0" style={{ fontSize: '14px', borderRadius: '4px' }}>
                            {mensajeError}
                        </div>
                    )}
                </div>
            </form>
        </div>
    )
}

export default AgregarJugador