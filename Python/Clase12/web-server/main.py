import store
from fastapi import FastAPI
from fastapi.responses import HTMLResponse

app = FastAPI() # Crear una instancia de FastAPI y con esto creamos nuestro primer recurso

@app.get('/') # Agregamos un decorador para definir la ruta raíz
def get_list():
    return [1, 2, 3, 4, 5]

@app.get('/contact', response_class=HTMLResponse) # Agregamos un decorador para definir la ruta /contact
def get_list():
    return """
        <h1>Contacto</h1>
        <p>Mi contacto es:</p>
    """

def run():
    store.get_razas()

if __name__ == '__main__':
    run()