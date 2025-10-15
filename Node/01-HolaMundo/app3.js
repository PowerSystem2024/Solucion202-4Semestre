// Ejecucion asincrona con setTimeout

console.log('Inicio del programa');

setTimeout(() => {
    console.log('Primer timeout');
}, 3000); // 3 segundos

setTimeout(() => {
    console.log('Segundo timeout');
}, 0); // 0 segundos

setTimeout(() => {
    console.log('Tercer timeout');
}, 0); // 0 segundos

console.log('Fin del programa');