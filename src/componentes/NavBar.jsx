import { NavLink, Outlet, useNavigate } from 'react-router'
import logoApp from '../assets/WorldCupFanLogo.png'
const NavBar = () => {

    const usuario = localStorage.getItem('usuario')
    const navigate = useNavigate()

    const logOut = () => {
        localStorage.clear()
        navigate('/')
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary border-bottom" data-bs-theme="light">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" style={{ color: '#0176d3' }} to="/dashboard">
                    <img 
                            src={logoApp} 
                            alt="Logo Webpage" 
                            width="30" 
                            height="30" 
                            className="d-inline-block align-text-top me-2" 
                        />
                    Dashboard</NavLink>
                    <button className='navbar-toggler' type='button' data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span className='navbar-toggler-icon'></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="nav-link link-danger link-opacity-50 link-opacity-100-hover">
                            <NavLink className="nav-link" to="/" onClick={logOut}>Log Out</NavLink>
                        </div>
                    </div>
                    {usuario ? <span className='navbar-text'>Bienvenido {usuario}</span> : null}
                </div>
            </nav>
            <Outlet />
        </div>
    )
}

export default NavBar