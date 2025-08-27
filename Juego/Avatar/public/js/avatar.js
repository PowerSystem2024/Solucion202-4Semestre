// ======================
// 1) LISTA DE PERSONAJES 
// ======================
const personajesDisponibles = ['Zuko', 'Katara', 'Aang', 'Toph'];

// ======================
// 2) VARIABLES GLOBALES
// ======================
const estadoJuego = {
    personajes: {
        jugador: '',
        enemigo: ''
    },
    vidas: {
        jugador: 3,
        enemigo: 3
    },
    imagenes: {
        Zuko: "./img/zuko.jpg",
        Katara: "./img/katara.jpg",
        Aang: "./img/Aang.jpg",
        Toph: "./img/toph.jpeg"
    },
    ataques: ['PUÑO', 'EMBESTIDA', 'PATADA', 'BARRIDA']
};

// ======================
// DRY: Función para obtener personaje seleccionado
// ======================
function obtenerPersonajeSeleccionado(tipo) {
    for (let personaje of personajesDisponibles) {
        if (document.getElementById(`${personaje}-${tipo}`).checked) {
            return personaje;
        }
    }
    return '';
}

// ======================
// DRY: Función para resaltar tarjeta seleccionada
// ======================
function resaltarTarjetaSeleccionada(tipo, personaje) {
    document.querySelectorAll(`.opcion-personaje[for$="-${tipo}"]`).forEach(card => card.classList.remove('seleccionado'));
    let label = document.querySelector(`label[for="${personaje}-${tipo}"]`);
    if (label) label.classList.add('seleccionado');
}

// ======================
// DRY: Habilitar/deshabilitar botones de ataque
// ======================
function setEstadoBotonesAtaque(habilitar) {
    ["boton-puño", "boton-embestida", "boton-patada", "boton-barrida"].forEach(id => {
        document.getElementById(id).disabled = !habilitar;
    });
}

// ======================
// 3) INICIALIZAR JUEGO
// ======================
function iniciarJuego() {
    document.getElementById("boton-personaje")
            .addEventListener("click", seleccionarPersonajeJugador);

    document.getElementById("boton-puño")
            .addEventListener("click", () => manejarAtaque("PUÑO"));
    document.getElementById("boton-embestida")
            .addEventListener("click", () => manejarAtaque("EMBESTIDA"));
    document.getElementById("boton-patada")
            .addEventListener("click", () => manejarAtaque("PATADA"));
    document.getElementById("boton-barrida")
            .addEventListener("click", () => manejarAtaque("BARRIDA"));
    setEstadoBotonesAtaque(false); // DRY

    document.getElementById("boton-reiniciar")
            .addEventListener("click", reiniciarJuego);

    document.getElementById("seleccionar-ataque").style.display = 'none';
    document.getElementById("mensajes").style.display = 'none';
    document.getElementById("reiniciar").style.display = 'none';

    document.getElementById("boton-reglas").addEventListener("click", function() {
        document.getElementById("panel-reglas").style.display = "block";
    });
    document.getElementById("cerrar-reglas").addEventListener("click", function() {
        document.getElementById("panel-reglas").style.display = "none";
    });

    let btnLuchar = document.createElement("button");
    btnLuchar.id = "boton-luchar";
    btnLuchar.className = "btn btn-primario";
    btnLuchar.innerText = "Luchar";
    btnLuchar.style.display = "none";
    document.getElementById("seleccionar-enemigo").appendChild(btnLuchar);

    btnLuchar.addEventListener("click", function () {
        // Verificar si se seleccionó manualmente un enemigo
        estadoJuego.personajes.enemigo = obtenerPersonajeSeleccionado('enemigo');
        
        // Si no se seleccionó un enemigo, elegir uno aleatorio
        if (!estadoJuego.personajes.enemigo) {
            const posiblesEnemigos = personajesDisponibles.filter(p => p !== estadoJuego.personajes.jugador);
            estadoJuego.personajes.enemigo = posiblesEnemigos[Math.floor(Math.random() * posiblesEnemigos.length)];
            // Marcar el radio button del enemigo seleccionado aleatoriamente
            const radioEnemigo = document.getElementById(`${estadoJuego.personajes.enemigo}-enemigo`);
            if (radioEnemigo) {
                radioEnemigo.checked = true;
            }
        }

        // Actualizar la interfaz con el enemigo seleccionado
        document.getElementById("personaje-enemigo").innerText = estadoJuego.personajes.enemigo;
        
        // Aplicar animación al enemigo
        const labelEnemigo = document.querySelector(`label[for="${estadoJuego.personajes.enemigo}-enemigo"]`);
        if (labelEnemigo) {
            labelEnemigo.style.animation = "vs-slide-in-right 0.7s cubic-bezier(.5,1.5,.5,1) both";
        }
        
        // Resaltar la tarjeta del enemigo
        resaltarTarjetaSeleccionada('enemigo', estadoJuego.personajes.enemigo);
        
        // Deshabilitar la selección una vez que se inicia la lucha
        document.getElementsByName("personaje-enemigo").forEach(radio => radio.disabled = true);
        
        // Esperar a que termine la animación antes de continuar
        setTimeout(() => {
            document.getElementById("seleccionar-personaje").style.display = "none";
            document.getElementById("seleccionar-enemigo").style.display = "none";
            mostrarPanelAtaque();
        }, 600); // Esperar un poco más que la duración de la animación
    });
}

window.addEventListener('load', iniciarJuego);

// ======================
// 4) SELECCIÓN DEL PERSONAJE JUGADOR
// ======================
function seleccionarPersonajeJugador() {
    let spanPJ = document.getElementById('personaje-jugador');
    estadoJuego.personajes.jugador = obtenerPersonajeSeleccionado('jugador'); // DRY

    if (!estadoJuego.personajes.jugador) {
        alert("Por favor, selecciona un personaje para ti.");
        return;
    }

    spanPJ.innerText = estadoJuego.personajes.jugador;
    document.getElementById("boton-personaje").disabled = true;
    document.getElementsByName("personaje-jugador")
        .forEach(radio => radio.disabled = true);

    // Aplicar animación de selección al jugador
    resaltarTarjetaSeleccionada('jugador', estadoJuego.personajes.jugador); // DRY

    // Mostrar botón de luchar y aplicar la misma animación que antes
    const btnLuchar = document.getElementById("boton-luchar");
    btnLuchar.style.display = "block";

    // Aplicar animación cuando se selecciona el personaje del jugador
    const labelJugador = document.querySelector(`label[for="${estadoJuego.personajes.jugador}-jugador"]`);
    if (labelJugador) {
        labelJugador.style.animation = "vs-slide-in-left 0.7s cubic-bezier(.5,1.5,.5,1) both";
    }

    document.getElementById("boton-luchar").style.display = "block";
}

// La selección del enemigo ahora se maneja automáticamente en seleccionarPersonajeJugador()

// ======================
// 6) MOSTRAR PANEL DE ATAQUE SI AMBOS PERSONAJES ESTÁN ELEGIDOS
// ======================
function mostrarPanelAtaque() {
    // Obtener elementos VS una sola vez
    const vj = document.getElementById("versus-jugador");
    const ve = document.getElementById("versus-enemigo");
    
    // Mostrar paneles necesarios
    document.getElementById("seleccionar-ataque").style.display = 'block';
    document.getElementById("mensajes").style.display = 'block';
    document.getElementById("reiniciar").style.display = 'block';

    // Actualizar imágenes y nombres
    document.getElementById("img-jugador-vs").src = estadoJuego.imagenes[estadoJuego.personajes.jugador];
    document.getElementById("img-jugador-vs").alt = estadoJuego.personajes.jugador;
    document.getElementById("nombre-jugador-vs").innerText = estadoJuego.personajes.jugador;

    document.getElementById("img-enemigo-vs").src = estadoJuego.imagenes[estadoJuego.personajes.enemigo];
    document.getElementById("img-enemigo-vs").alt = estadoJuego.personajes.enemigo;
    document.getElementById("nombre-enemigo-vs").innerText = estadoJuego.personajes.enemigo;

    // Limpiar clases y animaciones previas
    vj.classList.remove("vs-ganador", "vs-perdedor");
    ve.classList.remove("vs-ganador", "vs-perdedor");
    vj.style.animation = "none";
    ve.style.animation = "none";
    
    // Posicionar elementos fuera de la pantalla
    vj.style.transform = "translateX(-100%)";
    ve.style.transform = "translateX(100%)";
    
    // Forzar un reflow/repaint
    vj.offsetHeight;
    ve.offsetHeight;
    
    // Aplicar nuevas animaciones
    requestAnimationFrame(() => {
        vj.style.transform = "";
        ve.style.transform = "";
        vj.style.animation = "vs-slide-in-left 0.7s cubic-bezier(.5,1.5,.5,1) both";
        ve.style.animation = "vs-slide-in-right 0.7s cubic-bezier(.5,1.5,.5,1) both";
    });

    actualizarVidasEnPantalla();
    setEstadoBotonesAtaque(true); // DRY
}

// ======================
// 7) HABILITAR / DESHABILITAR BOTONES DE ATAQUE
// ======================
// Reemplazado por setEstadoBotonesAtaque(habilitar) // DRY

// ======================
// 8) MANEJAR ATAQUE DEL JUGADOR
// ======================
function manejarAtaque(ataqueJugador) {
    if (estadoJuego.vidas.jugador <= 0 || estadoJuego.vidas.enemigo <= 0) return;
    if (estadoJuego.personajes.jugador === '' || estadoJuego.personajes.enemigo === '') return;

    const indice = Math.floor(Math.random() * estadoJuego.ataques.length);
    const ataqueEnemigo = estadoJuego.ataques[indice];

    compararAtaques(ataqueJugador, ataqueEnemigo);
}

// ======================
// 9) COMPARAR ATAQUES Y ACTUALIZAR VIDAS
// ======================
function compararAtaques(ataqueJugador, ataqueEnemigo) {
    let mensaje = "";

    if (ataqueJugador === ataqueEnemigo) {
        mensaje = `¡EMPATE! Ambos usaron ${ataqueJugador}.`;
    } else {
        const ganaJugador =
            (ataqueJugador === "PUÑO" && ataqueEnemigo === "PATADA") ||
            (ataqueJugador === "PATADA" && ataqueEnemigo === "BARRIDA") ||
            (ataqueJugador === "BARRIDA" && ataqueEnemigo === "EMBESTIDA") ||
            (ataqueJugador === "EMBESTIDA" && ataqueEnemigo === "PUÑO");

        if (ganaJugador) {
            estadoJuego.vidas.enemigo--;
            mensaje = `¡GANASTE! Tu ${ataqueJugador} derrotó a ${ataqueEnemigo}.`;
        } else {
            estadoJuego.vidas.jugador--;
            mensaje = `¡PERDISTE! Tu ${ataqueJugador} fue vencido por ${ataqueEnemigo}.`;
        }
    }

    actualizarVidasEnPantalla();
    document.getElementById("texto-mensaje").innerText = mensaje;

    if (estadoJuego.vidas.jugador <= 0 || estadoJuego.vidas.enemigo <= 0) {
        finalizarJuego();
    }
}

// ======================
// 10) ACTUALIZAR VIDAS EN EL HTML
// ======================
function actualizarVidasEnPantalla() {
    document.getElementById("vidas-jugador").innerText = estadoJuego.vidas.jugador;
    document.getElementById("vidas-enemigo").innerText = estadoJuego.vidas.enemigo;
}

// ======================
// 11) FINALIZAR JUEGO
// ======================
function finalizarJuego() {
    setEstadoBotonesAtaque(false); // DRY
    const textoFinal = document.getElementById("texto-mensaje");

    document.getElementById("versus-jugador").classList.remove("vs-ganador", "vs-perdedor");
    document.getElementById("versus-enemigo").classList.remove("vs-ganador", "vs-perdedor");

    const vj = document.getElementById("versus-jugador");
    const ve = document.getElementById("versus-enemigo");
    vj.style.animation = "";
    ve.style.animation = "";

    if (estadoJuego.vidas.jugador <= 0) {
        textoFinal.innerText = `¡HAS SIDO DERROTADO! ${estadoJuego.personajes.enemigo} se impuso.`;
        document.getElementById("versus-jugador").classList.add("vs-perdedor");
        document.getElementById("versus-enemigo").classList.add("vs-ganador");
    } else if (estadoJuego.vidas.enemigo <= 0) {
        textoFinal.innerText = `¡FELICITACIONES! ${estadoJuego.personajes.jugador} ganó la batalla.`;
        document.getElementById("versus-jugador").classList.add("vs-ganador");
        document.getElementById("versus-enemigo").classList.add("vs-perdedor");
    }
}

// ======================
// 12) REINICIAR JUEGO
// ======================
function reiniciarJuego() {
    document.querySelectorAll('.opcion-personaje').forEach(card => card.classList.remove('seleccionado'));

    estadoJuego.personajes.jugador = '';
    estadoJuego.personajes.enemigo = '';
    estadoJuego.vidas.jugador = 3;
    estadoJuego.vidas.enemigo = 3;

    document.getElementById("personaje-jugador").innerText = "";
    document.getElementById("personaje-enemigo").innerText = "";
    document.getElementById("vidas-jugador").innerText = estadoJuego.vidas.jugador;
    document.getElementById("vidas-enemigo").innerText = estadoJuego.vidas.enemigo;
    document.getElementById("texto-mensaje").innerText = "";

    document.getElementById("seleccionar-ataque").style.display = 'none';
    document.getElementById("mensajes").style.display = 'none';
    document.getElementById("reiniciar").style.display = 'none';

    document.getElementById("boton-personaje").disabled = false;
    document.getElementsByName("personaje-jugador").forEach(radio => {
        radio.checked = false;
        radio.disabled = false;
    });

    setEstadoBotonesAtaque(false); // DRY

    let btnLuchar = document.getElementById("boton-luchar");
    if (btnLuchar) btnLuchar.style.display = "none";

    document.getElementById("seleccionar-personaje").style.display = "block";
    document.getElementById("seleccionar-enemigo").style.display = "block";

    document.getElementById("versus-jugador").classList.remove("vs-ganador", "vs-perdedor");
    document.getElementById("versus-enemigo").classList.remove("vs-ganador", "vs-perdedor");
}
