import { useContext } from 'react' //useContext es para extraer los datos del provider (context) en este caso es AuthContext
import AuthContext from '../context/AuthProvider'

//igual como si fuera un componente. Es un hook que creamos nosotros
const useAuth = () => {
    return useContext(AuthContext)

}

export default useAuth