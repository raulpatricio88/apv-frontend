import axios from 'axios'

//crea una url base
const clienteAxios = axios.create({
    //le pasamos el endpoint principal
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`
})

export default clienteAxios