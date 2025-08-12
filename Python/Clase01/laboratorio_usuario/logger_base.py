import logging as log

logger = log.getLogger('LaboratorioUsuarios')
# Pide ariel que el nivel de log sea DEBUG para ver todos los mensajes
logger.setLevel(log.WARNING)

consola = log.StreamHandler()
formato = log.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
consola.setFormatter(formato)
logger.addHandler(consola)