import { useState } from 'react'
import { Link } from 'react-router-dom'
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios'; //En React, axios no necesita la extension js o jsx pero si en node 

const Registrar = () => {
    const [ nombre, setNombre ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ repetirPassword, setRepetirPassword ] = useState('')

    const [ alerta, setAlerta ] = useState({})

    const handleSubmit =  async e => {
        e.preventDefault();

        if([ nombre, email, password, repetirPassword ].includes('')) {
            setAlerta({ msg: 'Hay campos vacios', error: true })
            return;
        }

        if(password !== repetirPassword){
          
          setAlerta({ msg: 'Las contraseñas no coinciden', error: true })
          return;
        }

        if(password.length < 6) {
          setAlerta({ msg: 'El password es muy corto, agregue como minimo 6 caracteres', error: true })
          return;
        }

        setAlerta({})
        console.log('Todo bien...')

        //Crear el usuario en la api
        try {
          
          //corresponde a area publica de api veterinarios
          await clienteAxios.post('/veterinarios', { nombre, email, password })  
          setAlerta({
            msg: 'Creado correctamente, te hemos enviado un email con las instrucciones',
            error: false
          })

        } catch (error) {
          setAlerta({ 
            msg: error.response.data.msg,
            error:true
           })
        }
    }

    const { msg } = alerta

    return (
      <>
        <div>
        {/* si necesito un espacio se puede poner {""} */}
            <h1 className="text-indigo-600 font-black text-6xl">
              Crea una Cuenta y Administra tus  
              <span className="text-black"> Pacientes</span>
            </h1>
        </div>


        <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'> 

          {/* via props se pasa informacion que esta en un componente hacia el otro */}
          {/* si en msg hay algo entonces muestre la alerta */}
          { msg && <Alerta 
            alerta={ alerta }  
          />}
            <form 
              onSubmit={handleSubmit}
            >
                <div className="my-5">
                        <label 
                          // block es para que tome todo el ancho
                          className="uppercase text-gray-600 block text-xl font-bold"
                        >
                            Nombre
                        </label>
                        <input 
                          type="text"  //para que aparezca un arroba en un telefono movil
                          placeholder="Tu nombre..."
                          className="border w-full p-3 mt-3 bg-gray-50 rounded-xl "
                          value={nombre} //variable del state
                          onChange={ e => setNombre(e.target.value) }
                        />
                    </div>

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
                      className="border w-full p-3 mt-3 bg-gray-50 rounded-xl "
                      value={email} //variable del state
                      onChange={ e => setEmail(e.target.value) }
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
                      type="password"  //para que no se vea la contraseña
                      placeholder="Tu Password..."
                      className="border w-full p-3 mt-3 bg-gray-50 rounded-xl "
                      value={password} //variable del state
                      onChange={ e => setPassword(e.target.value) }
                    />
                </div>

                <div className="my-5">
                    <label 
                      // block es para que tome todo el ancho
                      className="uppercase text-gray-600 block text-xl font-bold"
                    >
                        Repetir Password
                    </label>
                    <input 
                      type="password"  //para que no se vea la contraseña
                      placeholder="Repite tu Password..."
                      className="border w-full p-3 mt-3 bg-gray-50 rounded-xl "
                      value={repetirPassword} //variable del state
                      onChange={ e => setRepetirPassword(e.target.value) }
                    />
                </div>

                <input 
                  type="submit" 
                  value="Crear Cuenta"
                  className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold
                  mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto "
                />

            </form>    

            <nav className='mt-10 lg:flex lg:justify-between'>
                   <Link 
                      className='block text-center my-5 text-gray-500'
                      to="/">¿Ya tienes una cuenta? Inicia Sesión</Link>
                   <Link 
                      className='block text-center my-5 text-gray-500'
                      to="/olvide-password">Olvidé mi Password</Link>
            </nav>


        </div>
      </>
    )
  }
  
  export default Registrar;