# requirements.txt — qué, por qué y cómo (Linux)

## ¿Qué es y por qué es importante?
- `requirements.txt` lista las dependencias exactas de un proyecto Python.
- Permite reproducir entornos: otros desarrolladores, CI/CD y despliegues usan el mismo conjunto de paquetes y versiones.
- Facilita la instalación rápida con `pip install -r requirements.txt`.
- Mejora trazabilidad y depuración: si hay un bug, se sabe qué versiones estaban instaladas.

---

## Buenas prácticas
- Crear dentro de un entorno virtual (venv/virtualenv) para aislar dependencias.
- Fijar versiones (ej. `package==1.2.3`) para reproducibilidad.
- Mantener un `requirements-dev.txt` para dependencias de desarrollo (tests, linters).
- Revisar y actualizar periódicamente; usar herramientas como `pip-tools` si es necesario.

---

## Flujo típico (comandos Linux)

1) Crear y activar entorno virtual

````bash
python3 -m venv .venv
source .venv/bin/activate
````

2) Instalar paquetes durante el desarrollo

```bash
pip install requests flask pytest
```

3) Generar requirements.txt desde el entorno activo

```bash
# opción simple: lista todo lo instalado en el entorno
pip freeze > [requirements.txt](http://_vscodecontentref_/0)

# opción: solo paquetes "locales" (evita paquetes globales si los hubiera)
pip freeze --local > [requirements.txt](http://_vscodecontentref_/1)
```

4) Instalar desde requirements.txt en otra máquina/entorno

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r [requirements.txt](http://_vscodecontentref_/2)
```

# Actualizar dependencias y regenerar

* Para actualizar paquetes individuales:

```bash
# actualizar pip y luego paquetes listados
pip list --outdated --format=freeze | cut -d = -f 1 | xargs -n1 pip install -U
pip freeze > [requirements.txt](http://_vscodecontentref_/4)
```

# Alternativas y herramientas útiles

* pip-tools (pip-compile) para separar requirements.in (declarativo) y requirements.txt (concretado).
* pipreqs genera requirements leyendo importaciones del código:

```bash
pip install pipreqs
pipreqs /ruta/al/proyecto
```

## Copiar / compartir el archivo (Linux)

* Copiar localmente:

```bash
cp [requirements.txt](http://_vscodecontentref_/5) /ruta/destino/
```

## Copiar a otra máquina por SSH:

```bash
scp [requirements.txt](http://_vscodecontentref_/6) usuario@host:/ruta/destino/
```
* Añadir al control de versiones:

```bash
git add [requirements.txt](http://_vscodecontentref_/8)
git commit -m "Add requirements.txt"
git push
```