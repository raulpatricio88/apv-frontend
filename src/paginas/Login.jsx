import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom' //Link sirve para que no se muestre el spinner de React y directamente lleva al enlace para ahorrar carga, aparte de indicar un enlace
import Alerta from '../components/Alerta';
import useAuth from '../hooks/useAuth';
import clienteAxios from '../config/axios';

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [alerta, setAlerta] = useState({})

    const { setAuth } = useAuth() //va a tomar el resultado de data

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if([email, password].includes('')) {
            setAlerta({
              msg: 'Todos los campos son obligatorios',
              error: true
            });

            return
        }

        try {
            const { data } = await clienteAxios.post('/veterinarios/login', { email, password })
            localStorage.setItem('token', data.token)
            setAuth(data) //Esto hizo que me lleve al panel de admin
            navigate('/admin') //Redirecciona al usuario a /admin
        } catch (error) {
            setAlerta({
              msg: error.response.data.msg,
              error: true
            })
        }
    }

    const { msg } = alerta

  return (
    <>

        <div>
            <h1 className="text-indigo-600 font-black text-6xl">
              Inicia Sesión y Administra tus 
              <span className="text-black"> Pacientes</span>
            </h1>
        </div>
        {/* md:mt-5: en un dispositivo mas grande la separacion será menor (mt-5?) */}
        <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'> 
          {msg && <Alerta 
              alerta={alerta}
          />}

            <form onSubmit={handleSubmit}>
                <div className="my-5">
                    <label 
                      // block es para que tome todo el ancho
                      className="uppercase text-gray-600 block text-xl font-bold"
                    >
                        Email
                    </label>
                    <input 
                      type="email"  //para que aparezca un arroba en un telefono movil
                      placeholder="Email de Registro..."
                      className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <div className="my-5">
                    <label 
                      // block es para que tome todo el ancho
                      className="uppercase text-gray-600 block text-xl font-bold"
                    >
                        Password
                    </label>
                    <input 
                      type="password" 
                      placeholder="Tu Password..."
                      className="border w-full p-3 mt-3 bg-gray-50 rounded-xl "
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <input 
                  type="submit" 
                  value="Iniciar sesión"
                  className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold
                  mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto "
                />

            </form>

            <nav className='mt-10 lg:flex lg:justify-between'>
                   <Link 
                      className='block text-center my-5 text-gray-500'
                      to="/registrar">¿No tienes una cuenta? Registrate!</Link>
                   <Link 
                      className='block text-center my-5 text-gray-500'
                      to="/olvide-password">Olvidé mi Password</Link>
            </nav>
        </div>
     
    </>
  );
};

export default Login;