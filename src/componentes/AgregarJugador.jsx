import { useRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setContenidoPosiciones } from '../store/slices/posicionesSlice'
import { setContenidoSelecciones } from '../store/slices/seleccionesSlice'
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
    const { listaSelecciones: selecciones = [], cargadosS } = useSelector(state => state.selecciones)

    useEffect(() => {
        if (!cargadosS) {
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
                    dispatch(setContenidoSelecciones(data.selecciones))
                })
                .catch(error => {
                    console.error('Error al obtener los paises:', error)
                })

        }
    }, [cargadosS, dispatch])

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
                        const jugadorCompleto = {
                            id: data.id, 
                            nombre: nombreJ.current.value,
                            idSeleccion: Number(seleccionJ.current.value),
                            posicion: Number(posicionJ.current.value), 
                            fechaNacimiento: fechaNacJ.current.value
                        };

                        dispatch(agregarJugador(jugadorCompleto));
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
            <form>
                {/* Select Selecciones */}
                <div className="mb-3">
                    <label htmlFor="seleccion" className="form-label text-secondary mb-1 fw-normal" style={{ fontSize: '12px' }}>Seleccion:</label>
                    <select id="seleccion" className="form-select form-select-sm py-2" ref={seleccionJ} onChange={cambioInputs} defaultValue="" style={{ borderRadius: '4px', borderColor: '#dddbda', fontSize: '14px', color: '#16325c' }} >
                        <option value="" disabled>Seleccione un pais</option>
                        {selecciones.map(seleccion => (
                            <option key={seleccion.id} value={seleccion.id}>{seleccion.nombre}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-3"> 
                    <label htmlFor="nombre" className="form-label text-secondary mb-1 fw-normal" style={{ fontSize: '12px' }}>Nombre Completo</label>
                    <input type="text" id='nombre' className="form-control form-control-sm py-2" placeholder="Ingrese el nombre del Jugador" ref={nombreJ} onChange={cambioInputs}  style={{ borderRadius: '4px', borderColor: '#dddbda', fontSize: '14px', color: '#16325c' }} />
                </div>
                {/* Select Posiciones */}
                <div className="mb-3">
                    <label htmlFor="posiciones" className="form-label text-secondary mb-1 fw-normal" style={{ fontSize: '12px' }}>Posicion:</label>
                    <select id="posiciones" className="form-select form-select-sm py-2" ref={posicionJ} onChange={cambioInputs} defaultValue="" style={{ borderRadius: '4px', borderColor: '#dddbda', fontSize: '14px', color: '#16325c' }} >
                        <option value="" disabled>Seleccione una posicion</option>
                        {posiciones.map(posicion => (
                            <option key={posicion.id} value={posicion.id}>{posicion.nombre}</option>
                        ))}
                    </select>
                </div>
                {/* Input Fecha Nacimiento*/}
                <div className="mb-3">
                    <label htmlFor='fechaNac' className="form-label text-secondary mb-1 fw-normal" style={{ fontSize: '12px' }} >Fecha de Nacimiento</label>
                    <input type='date' id='fechaNac'  className="form-control form-control-sm py-2"  max={hoy} placeholder="Ingrese la fecha de nacimiento del jugador" ref={fechaNacJ} onChange={cambioInputs} style={{ borderRadius: '4px', borderColor: '#dddbda', fontSize: '14px', color: '#16325c' }}/>
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