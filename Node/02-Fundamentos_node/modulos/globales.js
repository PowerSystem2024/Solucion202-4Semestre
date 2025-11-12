// this === global = true
console.log(this === global); // true

// Mostrar algo en consola (modulo)
console.log("Hola desde un módulo de Node.js");

// Mostrar un mensaje en forma de error
console.error("Este es un mensaje de error");

// Mostrar una advertencia
console.warn("Este es un mensaje de advertencia");

// Temporizador: Ejecutar una función después de un retraso
// setTimeout(() => {})
setTimeout(() => {
  console.log("Esto se muestra después de 2 segundos");
}, 2000);

// Temporizador: Ejecutar una función repetidamente a intervalos regulares
// setInterval(() => {})
let contador = 0;
const intervalo = setInterval(() => {  
  if (contador === 5) {  
    clearInterval(intervalo);
  } else {
    console.log("Esto se muestra cada 3 segundos " + contador);
    contador++;
  }
}, 3000);

// Da prioridad de ejecucion a una funcion asincronica. Ya casi no se usa. Para la lógica diaria, async/await es la herramienta correcta.
setImmediate(() => {
  console.log("Esto se ejecuta inmediatamente después de las operaciones I/O");
});

// console.log(global)
// console.log(setInterval)

let i = 0
let intervalo2 = setInterval(() => {  
  if (i === 3) {  
    clearInterval(intervalo2); // Detiene el intervalo después de 3 ejecuciones
  } else {
    console.log("Intervalo en módulo global1.js " + i);
    i++;
  }
}, 1000);

setImmediate(() => {
    console.log("Saludo inmediato")
})

// require();

// console.log(process)
// console.log(__dirname)
// console.log(__filename)
global.miVariable = "Valor de la variable global";
