import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    // fragment: no va a generar mas codigo html
    <>

        {/* Outlet sirve para mostrar el contenido del componente hijo en este caso es Login, Registrar, etc (abajo de AuthLayout) */}
        <main className="container mx-auto md:grid md:grid-cols-2 mt-12 gap-10 p-5 items-center">
            <Outlet />
        </main>
    </>
  )
}

export default AuthLayout