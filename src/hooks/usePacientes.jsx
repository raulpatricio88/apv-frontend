import { useContext } from 'react' //useContext es para extraer los datos del provider (context) en este caso es AuthContext
import PacientesContext from '../context/PacientesProvider'

//igual como si fuera un componente. Es un hook que creamos nosotros
const usePacientes = () => {
    return useContext(PacientesContext)

}

export default usePacientes