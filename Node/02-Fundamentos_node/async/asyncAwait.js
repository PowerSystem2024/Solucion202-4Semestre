// La palabra async no es necesaria pero es una buena practica usarla para indicar que la funcion es asincrona
// Igual proyecta una sincronia visual 

async function hola(nombre) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            console.log('Hola, ' + nombre)
            resolve(nombre)
        }, 1000)
    })
}

async function hablar(nombre) {
    return new Promise ((resolve, reject) => { //Usamos la sintaxis ES6
        setTimeout(function(){
            console.log('Situacion conversacional :)')
            resolve(nombre)
        }, 1000)
    })
}

async function adios(nombre) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            console.log('Adios, ' + nombre)
            resolve()
            //reject('Hay un error!')
        }, 1000)
    })
}

// await solo se puede usar dentro de una funcion async
async function main() {
    
    let nombre = await hola('Carlos')
    await hablar()
    await hablar()
    await hablar()
    await hablar()
    await adios(nombre)
    console.log('Terminando el proceso')    
}
console.log('Iniciando el proceso... ')
main()
console.log('Esta va a ser la segunda instruccion...')