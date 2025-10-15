import { Router } from "express";
import { listarTarea } from "../controllers/tareas.controller.js"; 
import { listarTareas } from "../controllers/tareas.controller.js";
import { crearTarea } from "../controllers/tareas.controller.js";
import { actualizarTarea } from "../controllers/tareas.controller.js";
import { eliminarTarea } from "../controllers/tareas.controller.js";

const routes = Router();

routes.get("/tareas", listarTareas);
routes.get("/tareas/:id", listarTarea);
routes.post("/tareas", crearTarea);
routes.put("/tareas/:id", actualizarTarea);
routes.delete("/tareas/:id", eliminarTarea);

export default routes;
