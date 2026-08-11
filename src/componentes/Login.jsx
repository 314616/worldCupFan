import { NavLink, useNavigate } from 'react-router'
import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '../store/slices/spinnerSlice'
import Spinner from './Spinner'
import fotoBanner from '../assets/fotoBanner.jpg'
import WorldCupFanLogo from '../assets/WCFLogo.png'
const Login = () => {

    const user = useRef(null)
    const pass = useRef(null)

    const [botonLogin, setBotonLogin] = useState(false)
    const [mensajeError, setMensajeError] = useState('')
    const [error, setError] = useState(false)

    const dispatch = useDispatch()
    const usuarioLoading = useSelector(state => state.spinner.isLoading)

    const navigate = useNavigate()
    const cambioInput = () => {
        user.current.value && pass.current.value ? setBotonLogin(true) : setBotonLogin(false);
    }


    const loguear = () => {
        console.log('logueando')
        dispatch(setLoading(true))
        setBotonLogin(false)
        const bodyData = {
            usuario: user.current.value,
            password: pass.current.value
        }
        fetch('https://worldcupfan.develotion.com/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error de respuesta de la api')
                }
                return response.json()
            })
            .then(data => {
                localStorage.setItem('token', data.token)
                localStorage.setItem('usuario', bodyData.usuario)
                //localStorage.setItem('id', data.id)
                console.log(data)
                navigate('/dashboard')
            }).catch(error => {
                setError(true)
                setMensajeError(error)

            }).finally(() => {
                dispatch(setLoading(false))
                setBotonLogin(true)
            })
    }

    return (
        <div className="container-fluid min-vh-100 p-0 m-0 overflow-hidden">
            <div className="row g-0 min-vh-100">

                <div className='col-12 col-md-6 d-flex justify-content-center align-items-center min-vh-100' style={{ backgroundColor: '#f3f3f2' }}>
                    <div className="text-center" style={{ width: '100%', maxWidth: '420px', padding: '15px' }}>

                        {/*  LOGO */}
                        <div className="mb-4">
                            <img
                                src={WorldCupFanLogo}
                                alt="WorldCupFan Logo"
                                style={{
                                    maxHeight: '280px',    // Controla la altura máxima para que no quede gigante
                                    maxWidth: '100%',     // Asegura que sea responsivo si la pantalla es chica
                                    objectFit: 'contain'  // Evita que el logo se deforme o estire
                                }}
                            />
                        </div>
                        {/* Tarjeta Blanca del Formulario */}
                        <div className="card shadow-sm border-0 p-4 text-start" style={{ borderRadius: '4px', backgroundColor: '#ffffff' }}>
                            {/* Espacio reservado para el error para evitar saltos visuales */}
                            <div style={{ minHeight: '30px', display: 'flex', alignItems: 'center' }} className="mb-2">
                                {error ? (
                                    <p className="m-0 text-start" style={{ color: '#cc0000', fontSize: '13px', lineHeight: '1.4' }}>
                                        Error: {mensajeError}
                                    </p>
                                ) : null}
                            </div>
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="usuarioLogin" className='form-label text-secondary' style={{ fontSize: '13px' }}>Username</label>
                                    <input type="text" id="usuarioLogin" className='form-control py-2' name="usuarioLogin" placeholder='Ingrese su Usuario' ref={user} onChange={cambioInput} style={{ borderRadius: '4px', fontSize: '15px' }} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className='form-label text-secondary' style={{ fontSize: '13px' }}>Contraseña</label>
                                    <input type="password" id="password" className='form-control py-2' name="password" placeholder='Ingrese su Contrasenia' ref={pass} onChange={cambioInput} style={{ borderRadius: '4px', fontSize: '15px' }} />
                                </div>

                                <button type='button' className='btn w-100 py-2 fw-semibold text-white position-relative' onClick={loguear} disabled={!botonLogin} style={{ backgroundColor: '#0176d3', borderColor: '#0176d3', borderRadius: '4px', fontSize: '15px' }}>Iniciar sesion</button>
                                <div style={{ minHeight: '27px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="mt-2">
                                    {usuarioLoading ?
                                        <Spinner />
                                        : null}
                                </div>

                            </form>
                            <div className="mt-4 pt-3 border-top text-center" style={{ fontSize: '14px' }}>
                                <NavLink to="/registro" style={{ color: '#0176d3', textDecoration: 'none' }}>
                                    ¿No tienes cuenta? Regístrate aquí
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>


                {/* MITAD DERECHA: Banner Informativo / Imagen */}
                {/* Nota: d-none d-md-flex oculta esta sección en celulares y la muestra solo en pantallas grandes */}
                <div className="col-md-6 d-none d-md-flex flex-column justify-content-center align-items-center" style={{ backgroundColor: '#f3f3f2', padding: '40px' }}>
                    <div style={{ maxWidth: '500px' }} className="text-start">

                        {/* Puedes reemplazar este bloque por tu imagen o texto de presentación */}
                        <h2 className="fw-bold mb-3" style={{ color: '#091a46', fontSize: '2.5rem' }}>
                            ¡Bienvenido a la Copa Mundial!
                        </h2>
                        <p className="text-secondary mb-4" style={{ fontSize: '16px', lineHeight: '1.6' }}>
                            Accede a nuestra plataforma exclusiva y sigue el rendimiento de tus jugadores favoritos. Conéctate con fanáticos de todo el mundo y sigue tus estadísticas en tiempo real.
                        </p>

                        <div className="w-100 mt-4">
                            <img
                                src={fotoBanner}
                                alt="Banner Mundial"
                                className="img-fluid w-100"
                                style={{ borderRadius: '12px', objectFit: 'contain' }}
                            />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login