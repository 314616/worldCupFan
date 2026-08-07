import './App.css'
import './bootstrap.min.css'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { BrowserRouter, Routes, Route } from 'react-router'
import Login from './componentes/Login'
import Registro from './componentes/Registro'
import Dashboard from './componentes/Dashboard'
import NavBar from './componentes/NavBar'
function App() {


  return (
    <Provider store={store}>
      <BrowserRouter>
      <Routes>
        
        <Route path='/' element={<Login/>}/>
        <Route path='/registro' element={<Registro/>}/>
        <Route path='/dashboard' element={<NavBar/>}>
          <Route path='/dashboard' element={<Dashboard/>}/>
        </Route>


      </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
