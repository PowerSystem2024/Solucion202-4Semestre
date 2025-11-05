# Entorno virtual en python

<br>Comenzamos con el entorno virtual en Python, para ingresar al repo despues de un tiempo tuve que hacer lo siguiente, abri la terminal de Ubuntu desde Windows como administrador</br>

```sh
    mkdir py-project
    cd py-project
    git clone https://...
    ll
    cd python-pip
    code .
    git branch # Solo esta la rama main
    git branch second # Comenzamos a crear nuevas ramas
    git branch profe 
    git branch juan22
    git status # Desde la rama main ya hay cambio para commitear
    git add .
    git commit -m "Agrego el archivo txt donde detallo cada parte de las clases"
    git push origin main # Surge un problema, debo crear un token para poder cargar cambios
    # Se debe entrar en GitHub settings - Developer settings - Personal access tokens - token classic.
    # Se genera escribiendo las notas de que trabajo se va a tratar y se debe tildar, cuanto tiempo de duracion tendrá el token y tildar los permisos, generar y por último copiar el token.
    git pull origin main
    Usuario: usuarioX
    password: accesToken # El que hemos creado y debemos guardar bien
```

No se encontro el repositorio por eso no se pudo clonar. 