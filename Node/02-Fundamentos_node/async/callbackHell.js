function hola(nombre, miCallback) {
    setTimeout(function() {
        console.log('Hola, ' + nombre)
        miCallback(nombre)
    }, 1000)
}

function hablar(callBackHablar) {
    setTimeout(function() {
        console.log('Situacion conversacional :)')
        callBackHablar()
    }, 1000)
}

function adios(nombre, miCallback2) {
    setTimeout(function() {
        console.log('Adios, ' + nombre)
        miCallback2()
    }, 1500)
}

// Funcion recursiva
function conversacion(nombre, veces, callback)  {
    if (veces > 0) {
        hablar(function() {
            conversacion(nombre, --veces, callback)
        })
    } else {
        callback(nombre, callback)
    }
}


// -- Proceso principal --
console.log('Iniciando el proceso... ')
hola('Juan', function(nombre) {
    conversacion(nombre, 3, function(nombre, callback) {
        adios(nombre, function() {
            console.log('Finalizando el proceso...')
        })
    })
})

// hola('Carlos', function(nombre) {
//     hablar(function() {
//         hablar(function() {
//             hablar(function() {
//                 hablar(function() {
//                     adios(nombre, function() {
//                         console.log('Finalizando el proceso...')
//                     })
//                 })
//             })
//         })
//     })
// })