from conexion import Conexion
from logger_base import logger

class CursorDelPool:
    def __init__(self):
        self._conn = None
        self._cursor = None

    def __enter__(self):
        logger.debug('Inicio de with (Cursor del pool)')
        self._conn = Conexion.obtenerConexion()
        self._cursor = self._conn.cursor()
        return self._cursor
    
    def __exit__(self, tipo_excepcion, valor_excepcion, traceback_ex):
        logger.debug('Se ejecuta __exit__')
        if valor_excepcion:
            self._conn.rollback()
            logger.error(f'Rollback por: {valor_excepcion}')
        else:
            self._conn.commit()
            logger.debug('Commit')
        self._cursor.close()
        Conexion.liberarConexion(self._conn)
        return True