
# 🚀 Proyecto Bomba con JavaScript

**Demo:** [Ver en vivo](https://juanmarcoso.github.io/ProyectoPruebajs/) 

## 📋 Descripción
Estructura web básica con:
- Página HTML principal
- Estilos CSS personalizados
- Funcionalidades JavaScript

## 🛠 Stack Tecnológico
<div align="left">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
</div>

## 📁 Estructura del Proyecto

PROYECTOPRUEBASJS/
├── sound/ # Biblioteca de efectos de sonido
│ ├── alarm.mp3 # Sonido de alarma
│ └── explosion.mp3 # Efecto de explosión
├── index.html # Página principal
├── detalles.css # Estilos personalizados
└── prueba.js # Lógica de la aplicación

## 🚀 Cómo comenzar

### Requisitos previos
- Navegador web moderno
- Git (opcional)

### Instalación
1. Clona el repositorio:

```bash
git clone https://github.com/juanmarcoso/ProyectoPruebajs.git
```

2. Abre el archivo index.html en tu navegador

🔊 Uso de efectos de sonido

Los archivos de audio están disponibles en la carpeta sound/ y pueden ser reproducidos mediante:

```bash
// Ejemplo de reproducción en prueba.js
const audio = new Audio('sound/alarm.mp3');
audio.play();
```
🎨 Personalización

+ Modifica detalles.css para cambiar el diseño

+ Añade más sonidos en la carpeta sound/

+ Edita prueba.js para agregar nuevas funcionalidades

📝 Notas importantes

+ Todos los archivos de audio deben estar en formato MP3

+ Asegúrate de actualizar las rutas si cambias la estructura de carpetas

+ Para producción, considera comprimir los archivos de audio