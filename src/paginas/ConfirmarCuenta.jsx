import { useEffect, useState } from 'react' //useEffect es para que ejecute un codigo una vez que el componente esta listo
import { useParams, Link } from 'react-router-dom' // para ver el parametro de la URL
//import axios from 'axios': no se importa porque ya fue importado de clienteAxios(axios.jsx)
import clienteAxios from '../config/axios';
import Alerta from '../components/Alerta';

const ConfirmarCuenta = () => {
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false) //por defecto no estará confirmada
  const [cargando, setCargando] = useState(true)
  const [alerta, setAlerta] = useState({})

  const params = useParams() //para extraer los parametros de la url: confirmar/:id es decir el id (???)
  const { id } = params

  // capturar el token, que en este caso es la variable id y confirma la cuenta
  useEffect(() => {
    const confirmarCuenta = async () => {
      try {

        const url = `/veterinarios/confirmar/${id}`
        // data es la respuesta de axios. axios(url) es get por defecto (axios.get(url))
        //en el browser hay que poner la url con el token de la BD ejemplo:
        //http://`${FRONT_END_URL}`/confirmar/1i2s31hcorac6416b0sg y la confirma
        const { data } = await clienteAxios(url) 
        setCuentaConfirmada(true)
        setAlerta({
          msg: data.msg //data es la respuesta que estamos obteniendo del servidor, corresponde a 'Usuario confirmado correctamente' del backend (veterinarioController)
        })
        //console.log(data)
      } catch (error) {
          setAlerta({
            msg: error.response.data.msg,
            error: true
          })
      }

      setCargando(false)
    }
    confirmarCuenta();
  }, []) // []: se agrega dependencia para que el useEffect se ejecute solo una vez cuando el componente este listo

    return (
      <>
          <div>
        {/* si necesito un espacio se puede poner {""} */}
            <h1 className="text-indigo-600 font-black text-6xl">
              Confirma tu Cuenta y comienza a Administrar tus  
              <span className="text-black"> Pacientes</span>
            </h1>
        </div>


        <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'> 
          {/* si no esta cargando entonces muestre la alerta en este div*/}
          {!cargando &&  
            <Alerta 
              alerta={alerta}
            />}

            {cuentaConfirmada && (
              <Link 
              className='block text-center my-5 text-gray-500'
              to="/">Iniciar Sesión</Link>

            )}
          
        </div>
      
      </>
    )
  }
  
  export default ConfirmarCuenta;