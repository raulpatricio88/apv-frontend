import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthLayout from './layout/AuthLayout'
import RutaProtegida from './layout/RutaProtegida'

import Login from './paginas/Login'
import Registrar from './paginas/Registrar'
import OlvidePassword from './paginas/OlvidePassword'
import ConfirmarCuenta from './paginas/ConfirmarCuenta'
import NuevoPassword from './paginas/NuevoPassword'
import AdministrarPacientes from './paginas/AdministrarPacientes'
import EditarPerfil from './paginas/EditarPerfil'
import CambiarPassword from './paginas/CambiarPassword'

import { AuthProvider } from './context/AuthProvider'
import { PacientesProvider } from './context/PacientesProvider'

function App() {
  
  return (
    <BrowserRouter>
      <AuthProvider>
        <PacientesProvider>
          <Routes>
          {/* cuando un usuario visite el '/' carga el AuthLayout */}
            {/* Area publica */}
            <Route path='/' element={<AuthLayout />}> 
                {/* index es un prop para decirle que la pagina principal es ese elemento */}
                <Route index element={<Login />} /> 
                <Route path="registrar" element={<Registrar />} />
                <Route path="olvide-password" element={<OlvidePassword />} />
                <Route path="olvide-password/:token" element={<NuevoPassword />} />
                <Route path="confirmar/:id" element={<ConfirmarCuenta />} />
            </Route>

            {/* Este grupo agrega /admin al principio de la ruta */}
            <Route path="/admin" element={<RutaProtegida />}>
                <Route index element={<AdministrarPacientes />} />
                <Route path='perfil' element={<EditarPerfil />} />
                <Route path='cambiar-password' element={<CambiarPassword />} />
            </Route>
          </Routes>
        </PacientesProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
