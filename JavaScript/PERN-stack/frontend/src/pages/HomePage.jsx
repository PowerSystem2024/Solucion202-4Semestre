import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Card } from "../components/ui";

function HomePage() {
  // Obtenemos el estado de autenticación y los datos del usuario
  const { isAuth, user } = useAuth();

  return (
    // Centramos el contenido en la página, similar a tu Login
    <div className="h-[calc(100vh-64px)] flex items-center justify-center">
      <Card>
        {
          // ---- VISTA PARA USUARIOS AUTENTICADOS ----
          isAuth ? (
            <div className="text-center p-4">
              <h1 className="font-bold text-3xl mb-4">
                ¡Bienvenido de nuevo, {user ? user.name : 'Usuario'}!
              </h1>
              <p className="text-lg text-slate-300 mb-6">
                ¿Listo para organizar tu día? Ya puedes ver tus tareas o empezar
                a crear nuevas.
              </p>
              <div className="flex justify-center gap-x-4">
                <Link
                  to="/tareas"
                  className="bg-sky-500 text-white px-4 py-2 rounded-md hover:bg-sky-600 transition-colors"
                >
                  Ver mis Tareas
                </Link>
                <Link
                  to="/tareas/crear"
                  className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
                >
                  Crear una Tarea
                </Link>
              </div>
            </div>
          ) : (
            // ---- VISTA PARA VISITANTES (NO AUTENTICADOS) ----
            <div className="text-center p-4">
              <h1 className="font-bold text-3xl mb-4">
                Bienvenido a tu Gestor de Tareas PERN
              </h1>
              <p className="text-lg text-slate-300 mb-6">
                Organiza tus pendientes, gestiona tus proyectos y mantén tu vida
                en orden. Crea, actualiza y elimina tareas de forma rápida y
                segura.
              </p>
            </div>
          )
        }
      </Card>
    </div>
  );
}

export default HomePage;
