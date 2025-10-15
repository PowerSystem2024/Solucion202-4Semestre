import app from "./app.js";
import { pool } from "./db.js";

pool.query ("SELECT NOW()", (err, res) => {
    if (err) {
      console.error('Error al conectar a la base de datos', err);
    } else {
      console.log('Conexión exitosa a la base de datos:', res.rows);
    }
      app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
    pool.end();
  });
