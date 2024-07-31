import { useState } from 'react'
import Formulario from "../components/Formulario";
import ListadoPacientes from "../components/ListadoPacientes";


const AdministrarPacientes = () => {

  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  return (
    <div className="flex flex-col md:flex-row">
        <button
            type='button'
            className='bg-indigo-600 text-white font-bold uppercase mx-10 p-3 rounded-md mb-10 md:hidden'
            onClick={() => setMostrarFormulario(!mostrarFormulario)} // asi dejandolo como callback va a esperar a que suceda ese click. Si esta como false va a pasar a true si esta como true pasa a false
        >{mostrarFormulario ? 'Ocultar Formulario'  : 'Mostrar Formulario'  }</button>

        {/* md:block -> en un tamaño mediano si queremos que se muestre md:w-1/2: para que tome una de las 2 columnas */}
        <div className={`${mostrarFormulario ? 'block'  :  'hidden'  } md:block  md:w-1/2 lg:w-2/5`}> 
          <Formulario />
        </div>
        <div className="md:w-1/2 lg:w-3/5">
          <ListadoPacientes />
        </div>
    </div>
  );
};

export default AdministrarPacientes