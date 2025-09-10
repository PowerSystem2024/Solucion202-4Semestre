# Respuestas al Quiz de 27 de Agosto 2025 – Grupo Solución 202

## 1. ¿Cómo cambiamos el color del texto únicamente del botón de Punio?

Código del botón:

```html
<button id="boton-punio">Punio</button>
```

Respuesta correcta: **a. #boton-punio { color: red;}**

Justificación: Se utiliza `#` porque el botón está definido con un **id** y la propiedad `color` aplica al texto, no al fondo.

## 2. Tenemos un elemento `<p>` con un width de 100px, un height de 100px y un padding de 20px. ¿Qué propiedad y valor de CSS podemos añadirle a nuestro `<p>` para que el padding NO modifique el tamaño de 100px de ancho y 100px de alto de este elemento?

Respuesta correcta: **d. box-sizing: border-box;**

Justificación: Esta propiedad asegura que padding y borde se incluyan dentro del ancho y alto fijados, manteniendo los 100px exactos.

## 3. Quieres sobrescribir todo el contenido HTML de un elemento `sectionMensajes` por un nuevo texto almacenado en la variable `notificacion`. ¿Cómo lo harías?

Respuesta correcta: **b. sectionMensajes.innerHTML = notificacion**

Justificación: `innerHTML` permite reemplazar directamente el contenido del elemento con el nuevo valor de la variable.

## 4. ¿Qué propiedad y valor de CSS podemos utilizar para esconder secciones de HTML?

Respuesta correcta: **d. display: none;**

Justificación: Esta propiedad oculta el elemento y lo elimina del flujo del documento, a diferencia de otras opciones que solo lo vuelven invisible.
