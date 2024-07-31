import { Outlet, Navigate } from "react-router-dom"; // son dependencias
import Header from "../components/Header";
import Footer from "../components/Footer";
import useAuth from "../hooks/useAuth";

//El codigo de este archivo sirve para proteger cualquier componente con react-router-dom
// :se usa fragment ( <> </> ) porque estamos retornando multiples elementos en el primer nivel 
const RutaProtegida = () => {

    // para que traiga toda la informacion del context
    const { auth, cargando } = useAuth()

    // console.log(auth)
    // console.log(cargando)

    if(cargando) return 'cargando...'
  return (
    <>    
        <Header />

            {/* En caso de que el usuario este autenticado muestre el outlet (contenido de los componentes) sino, lleva al usuario a iniciar sesion */}
            { auth?._id ? ( 
                <main className="container mx-auto mt-10">
                    <Outlet />
                </main>    
             ) : <Navigate to="/" />}
        <Footer />
    </>
    )
};

export default RutaProtegida