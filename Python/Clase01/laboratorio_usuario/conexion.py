import psycopg2
from psycopg2 import pool
from logger_base import logger
from dotenv import load_dotenv
import os

load_dotenv()

class Conexion:
    _DATABASE = os.getenv('DB_NAME')
    _USERNAME = os.getenv('DB_USER')
    _PASSWORD = os.getenv('DB_PASSWORD')
    _DB_PORT = os.getenv('DB_PORT')
    _HOST = os.getenv('DB_HOST')
    _MIN_CON = 1
    _MAX_CON = 5
    _pool = None

    @classmethod
    def obtenerPool(cls):
        if cls._pool is None:
            try:
                cls._pool = psycopg2.pool.SimpleConnectionPool(
                    cls._MIN_CON, cls._MAX_CON,
                    host = cls._HOST,
                    user = cls._USERNAME, 
                    password = cls._PASSWORD,
                    port = cls._DB_PORT,
                    database = cls._DATABASE

                )
                logger.debug(f'Pool creado: {cls._pool}')
            except Exception as e:
                logger.error(f'Error al crear pool: {e}')
                raise
        return cls._pool
    
    @classmethod
    def obtenerConexion(cls):
        conexion = cls.obtenerPool().getconn()
        logger.debug(f'Conexion obtenida: {conexion}')
        return conexion
    
    @classmethod
    def liberarConexion(cls, conexion):
        cls.obtenerPool().putconn(conexion)
        logger.debug(f'Conexion liberada: {conexion}')
    
    @classmethod
    def cerrarConexiones(cls):
        if cls._pool:
            cls._pool.closeall()
            logger.debug('Pool cerrado.')