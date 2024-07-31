import { useState, useEffect, createContext } from 'react'
import clienteAxios from '../config/axios'

// context es para usar un state global
// Asi hacemos referencia a como se va a llamar el context
const AuthContext = createContext() 

//tiene la sintaxis de un componente. Provider es el que tiene los datos
const AuthProvider = ({children}) => {
    // Este state ya esta disponible en cualquier lugar
    const [cargando, setCargando] = useState(true)
    const [ auth, setAuth ] = useState({})

    //Para que cuando cargue la app (especificamente el authProvider) revise si el usuario esta autenticado o no
    useEffect(() => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem('token')
            if(!token) {
                setCargando(false)
                return
            }

            //corresponde a axios
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}` 
                }
            }

            try {
                const { data } = await clienteAxios('/veterinarios/perfil', config)

                setAuth(data)
            } catch (error) {
                console.log(error.response.data.msg)
                setAuth({})
            }

            setCargando(false)
            
        }
        autenticarUsuario()
    }, [])

    const cerrarSesion = () => {
        localStorage.removeItem('token')
        setAuth({})
    }

    const actualizarPerfil = async datos => {
        const token = localStorage.getItem('token')
            if(!token) {
                setCargando(false)
                return
            }
            //corresponde a axios
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}` 
                }
            }

        try {
            const url = `/veterinarios/perfil/${datos._id}`
            const { data } = await clienteAxios.put(url, datos, config)

            return {
                msg: 'Almacenado Correctamente'
            }
        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true
            }
        }
    }

    // 'datos' corresponde al password
    const guardarPassword = async (datos) => {
        const token = localStorage.getItem('token')
            if(!token) {
                setCargando(false)
                return
            }
            //corresponde a axios
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}` 
                }
            }

            try {
                const url = '/veterinarios/actualizar-password'
                const { data } = await clienteAxios.put(url, datos, config)
                console.log(data)

                return { 
                    msg: data.msg
                 }
            } catch (error) {
                return {
                    msg: error.response.data.msg,
                    error: true
                }
            }
    }

    return (
        <AuthContext.Provider
            //Con value ponemos a disposicion para los diferentes componentes
            value={{
                auth,
                setAuth,
                cargando,
                cerrarSesion,
                actualizarPerfil,
                guardarPassword
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export { 
    AuthProvider 
}

export default AuthContext