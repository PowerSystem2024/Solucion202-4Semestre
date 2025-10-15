export const listarTareas = (req, res) => {
  res.send("Obteniendo tareas");
};

export const listarTarea = (req, res) => {
  const { id } = req.params;
  res.send(`Obteniendo tarea con ID: ${id}`);
};

export const crearTarea = (req, res) => {
    console.log(req.body);
  res.send("Creando una nueva tarea");
};

export const actualizarTarea = (req, res) => {
  const { id } = req.params;
  res.send(`Actualizando tarea con ID: ${id}`);
};

export const eliminarTarea = (req, res) => {
  const { id } = req.params;
  res.send(`Eliminando tarea con ID: ${id}`);
};

export default {
  listarTareas,
  listarTarea,
  crearTarea,
  actualizarTarea,
  eliminarTarea
};