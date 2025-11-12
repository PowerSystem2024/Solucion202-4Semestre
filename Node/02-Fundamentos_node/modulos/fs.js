// Vamos a utilizar el modulo fs (file system) para leer y escribir archivos
const fs = require('fs');

// Trabajar con filesystem es trabajar con operaciones de entrada/salida (I/O), que son asincrónicas por naturaleza
// No se recomienda trabajar de forma síncrona en un entorno de Node.js, ya que puede bloquear el event loop y afectar el rendimiento de la aplicación

// Leer un archivo de forma asíncrona
function leer(ruta, cb){
  fs.readFile(ruta, (err, data) => {
    cb(data.toString());
  })
}

//leer(__dirname + '/archivo.txt', console.log); //sintaxis antigua
// leer(`${__dirname}/archivo.txt`, console.log); //sintaxis ES6

// Segundo escribimos el archivo.txt creandolo
function escribir(ruta, contenido){
  fs.writeFile(ruta, contenido, function(err){ // Si existe el archivo lo reescribe, si no existe lo crea
    if(err){
      console.log('No se ha podido escribir', err);
    }else{
      console.log('Se ha escrito correctamente');
    }
  })
}

// escribir(`${__dirname}/archivo1.txt`, 'Se ha reescrito el archivo', console.log)
// leer(`${__dirname}/archivo1.txt`, console.log); //sintaxis ES6

// Tercero eliminamos el archivo.txt
function borrar(ruta, cb){
  fs.unlink(ruta, cb); // Elimina archivos de forma asincrona
}

borrar(`${__dirname}/archivo1.txt`, console.log);