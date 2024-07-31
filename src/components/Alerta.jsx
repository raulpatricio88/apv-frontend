

const Alerta = ({ alerta }) => {
  return (
    //bg-gradient-to-r: activa el degradado hacia la derecha
    //Primero resolvemos el operador ternario y luego asignamos classNames
    <div className={`${alerta.error ? 
    'from-red-400 to-red-600' : 'from-indigo-400 to-indigo-600'}  
    bg-gradient-to-r text-center p-3 rounded-xl uppercase text-white font-bold text-sm mb-10`}> 
        {alerta.msg}
    </div>
  )
}

export default Alerta