import { useRef, useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '../store/slices/spinnerSlice'
import Spinner from './Spinner'
import { setContenidoPaises } from '../store/slices/paisesSlice'

const Registro = () => {

    const user = useRef(null)
    const pass = useRef(null)
    const selectPais = useRef(null)

    const [botonRegistro, setBotonRegistro] = useState(false)

    const dispatch = useDispatch()
    const usuarioLoading = useSelector(state => state.spinner.isLoading)
    const { listaPaises: paises =[], cargados } = useSelector(state => state.paises)

    useEffect(() => {
        if (!cargados) {
            fetch('https://worldcupfan.develotion.com/paises')
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

    const navigate = useNavigate()
    const cambioInput = () => {
        user.current.value && pass.current.value && selectPais.current.value !== "" ? setBotonRegistro(true) : setBotonRegistro(false);
    }

    const registrar = () => {
        console.log('registrando')
        dispatch(setLoading(true))
        setBotonRegistro(false)
        const bodyData = {
            usuario: user.current.value,
            password: pass.current.value,
            idPais: selectPais.current.value
        }
        console.log(bodyData)
        fetch('https://worldcupfan.develotion.com/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
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
                console.log(data)
                localStorage.setItem('token', data.token)
                localStorage.setItem('usuario', data.usuario)
                localStorage.setItem('id', data.id)
                navigate('/dashboard')
            })
            .catch(error => {
                console.error('Error al registrar:', error)
            })
            .finally(() => {
                dispatch(setLoading(false))
                setBotonRegistro(true)
            })

    }
    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100" style={{ backgroundColor: '#f3f3f2' }}>
            <div className="text-center" style={{ width: '100%', maxWidth: '420px', padding: '15px' }}>
                {/* Placeholder del Logo */}
                <h1 className="fw-bold mb-4" style={{ color: '#0176d3', fontSize: '2.5rem', letterSpacing: '-1px' }}>
                    WorldCupFan
                </h1>
                <div className="card shadow-sm border-0 p-4 text-start" style={{ borderRadius: '4px', backgroundColor: '#ffffff' }}>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="usuario" className="form-label text-secondary" style={{ fontSize: '13px' }}>Username:</label>
                            <input type="text" id="usuario" className="form-control py-2" name="usuario" placeholder='Ingrese su Usuario' ref={user} onChange={cambioInput} style={{ borderRadius: '4px', fontSize: '15px' }} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label text-secondary" style={{ fontSize: '13px' }}>Contrasenia:</label>
                            <input type="password" id="password" className="form-control py-2" name="password" placeholder='Ingrese su Contrasenia' ref={pass} onChange={cambioInput} style={{ borderRadius: '4px', fontSize: '15px' }} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="pais" className="form-label text-secondary" style={{ fontSize: '13px' }}>Pais:</label>
                            <select id="pais" className="form-select py-2" name="pais" ref={selectPais} onChange={cambioInput} defaultValue="" style={{ borderRadius: '4px', fontSize: '15px', color: '#4f4f4f' }} >
                                <option value="" disabled>Seleccione un pais</option>
                                {paises.map(pais => (
                                    <option key={pais.id} value={pais.id}>{pais.nombre}</option>
                                ))}
                            </select>
                        </div>

                        <button type='button' className="btn w-100 py-2 fw-semibold text-white position-relative" disabled={!botonRegistro} onClick={registrar} style={{
                            backgroundColor: '#0176d3', borderColor: '#0176d3', borderRadius: '4px', fontSize: '15px'
                        }}>Registrarse</button>

                        <div style={{ minHeight: '27px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="mt-2">
                            {usuarioLoading ?
                                <Spinner />
                                : null}
                        </div>
                    </form>

                    {/* Enlace de Login inferior dentro de la tarjeta */}
                    <div className="mt-4 pt-3 border-top text-center" style={{ fontSize: '14px' }}>
                        <NavLink to="/" style={{ color: '#0176d3', textDecoration: 'none' }}>
                            Volver al Login
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Registro