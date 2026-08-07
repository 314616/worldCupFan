import { NavLink, Outlet, useNavigate } from 'react-router'

const NavBar = () => {

    const usuario = localStorage.getItem('usuario')
    const navigate = useNavigate()

    const logOut = () => {
        localStorage.clear()
        navigate('/')
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark border-bottom border-bottom-dark" data-bs-theme="dark">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/dashboard">Dashboard</NavLink>
                    <button className='navbar-toggler' type='button' data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span className='navbar-toggler-icon'></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <NavLink className="nav-link" to="/dashboard">Principal</NavLink>
                            <NavLink className="nav-link" to="/" onClick={logOut}>Log Out</NavLink>
                        </div>
                    </div>
                    {usuario ? <span className='navbar-text'>Bienvenido {usuario}</span> : null}
                </div>
            </nav><br /><br /><br />
            <Outlet />
        </div>
    )
}

export default NavBar