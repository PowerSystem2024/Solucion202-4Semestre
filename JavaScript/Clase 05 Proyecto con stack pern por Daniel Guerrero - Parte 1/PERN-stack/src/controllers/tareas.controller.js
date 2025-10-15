import { pool } from "../db.js";

export const listarTareas = async (req, res) => {

    const resultado = await pool.query('SELECT * FROM tareas');
    console.log(resultado);
    return res.json(resultado.rows);
  
};

export const listarTarea = async (req, res, next) => {

    const resultado = await pool.query('SELECT * FROM tareas WHERE id = $1', [req.params.id]);

    if (resultado.rows.length === 0) {
        return res.status(404).json(
            { message: 'ID no encontrado' }
        )};
    return res.json(resultado.rows[0]);
  
};

export const crearTarea = async (req, res) => {
    const { titulo, descripcion } = req.body;

    try {
        const result = await pool.query('INSERT INTO tareas (titulo, descripcion) VALUES ($1, $2) RETURNING *', [titulo, descripcion]);
        res.json(result.rows[0]);
        console.log(result.rows[0]);
    } catch (error) {
        if (error.code === '23505') { // Código de error para violación de restricción única en PostgreSQL
            return res.status(409).json(
                { message: 'El título de la tarea ya existe. Por favor, elige otro título.' }
            );
        }
        console.error(error);
        next(error);
    } 
};

export const actualizarTarea = async (req, res) => {

    const { titulo, descripcion } = req.body;
    const { id } = req.params;
    const resultado = await pool.query('UPDATE tareas SET titulo = $1, descripcion = $2 WHERE id = $3 RETURNING *', [titulo, descripcion, id]);

    if (resultado.rows.length === 0) {
        return res.status(404).json(
        { message: 'ID no encontrado' }
        )};

    return res.json(resultado.rows[0]);

};

export const eliminarTarea = async (req, res) => {
  
    const resultado = await pool.query('DELETE FROM tareas WHERE id = $1 RETURNING *', [req.params.id]);

    if (resultado.rows.length === 0) {
        return res.status(404).json(
            { message: 'ID no encontrado' }
    )};
    return res.sendStatus(204); // No envia un mensaje al frontend

};

export default {
    listarTareas,
    listarTarea,
    crearTarea,
    actualizarTarea,
    eliminarTarea

}