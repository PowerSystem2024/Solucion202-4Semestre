// ======================
// 1) LISTA DE PERSONAJES 
// ======================
const personajesDisponibles = ['Zuko', 'Katara', 'Aang', 'Toph'];

// ======================
// 2) VARIABLES GLOBALES
// ======================

let personajeJugador = '';
let personajeEnemigo = '';

// Vidas iniciales
let vidasJugador = 3;
let vidasEnemigo = 3;

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
        document.getElementById("seleccionar-personaje").style.display = "none";
        document.getElementById("seleccionar-enemigo").style.display = "none";
        mostrarPanelAtaque();
    });
}

window.addEventListener('load', iniciarJuego);

// ======================
// 4) SELECCIÓN DEL PERSONAJE JUGADOR
// ======================
function seleccionarPersonajeJugador() {
    let spanPJ = document.getElementById('personaje-jugador');
    personajeJugador = obtenerPersonajeSeleccionado('jugador'); // DRY

    if (!personajeJugador) {
        alert("Por favor, selecciona un personaje para ti.");
        return;
    }

    spanPJ.innerText = personajeJugador;
    document.getElementById("boton-personaje").disabled = true;
    document.getElementsByName("personaje-jugador")
        .forEach(radio => radio.disabled = true);

    resaltarTarjetaSeleccionada('jugador', personajeJugador); // DRY

    const posiblesEnemigos = personajesDisponibles.filter(p => p !== personajeJugador);
    personajeEnemigo = posiblesEnemigos[Math.floor(Math.random() * posiblesEnemigos.length)];

    document.getElementById("personaje-enemigo").innerText = personajeEnemigo;
    resaltarTarjetaSeleccionada('enemigo', personajeEnemigo); // DRY

    document.getElementById("boton-luchar").style.display = "block";
}

// ======================
// 5) SELECCIÓN DEL PERSONAJE ENEMIGO 
// ======================
function seleccionarPersonajeEnemigo() {
    let spanPE = document.getElementById('personaje-enemigo');
    personajeEnemigo = obtenerPersonajeSeleccionado('enemigo'); // DRY

    if (!personajeEnemigo) {
        alert("Por favor, selecciona un personaje para el enemigo.");
        return;
    }

    spanPE.innerText = personajeEnemigo;
    document.getElementById("boton-enemigo").disabled = true;
    document.getElementsByName("personaje-enemigo")
            .forEach(radio => radio.disabled = true);

    resaltarTarjetaSeleccionada('enemigo', personajeEnemigo); // DRY

    if (personajeJugador !== '') {
        mostrarPanelAtaque();
    }
}

// ======================
// 6) MOSTRAR PANEL DE ATAQUE SI AMBOS PERSONAJES ESTÁN ELEGIDOS
// ======================
function mostrarPanelAtaque() {
    document.getElementById("seleccionar-ataque").style.display = 'block';
    document.getElementById("mensajes").style.display = 'block';
    document.getElementById("reiniciar").style.display = 'block';

    const imagenes = {
        Zuko: "./img/zuko.jpg",
        Katara: "./img/katara.jpg",
        Aang: "./img/Aang.jpg",
        Toph: "./img/toph.jpeg"
    };
    document.getElementById("img-jugador-vs").src = imagenes[personajeJugador];
    document.getElementById("img-jugador-vs").alt = personajeJugador;
    document.getElementById("nombre-jugador-vs").innerText = personajeJugador;

    document.getElementById("img-enemigo-vs").src = imagenes[personajeEnemigo];
    document.getElementById("img-enemigo-vs").alt = personajeEnemigo;
    document.getElementById("nombre-enemigo-vs").innerText = personajeEnemigo;

    document.getElementById("versus-jugador").classList.remove("vs-ganador", "vs-perdedor");
    document.getElementById("versus-enemigo").classList.remove("vs-ganador", "vs-perdedor");

    const vj = document.getElementById("versus-jugador");
    const ve = document.getElementById("versus-enemigo");
    vj.style.animation = "none";
    ve.style.animation = "none";
    void vj.offsetWidth;
    void ve.offsetWidth;
    vj.style.animation = "vs-slide-in-left 0.7s cubic-bezier(.5,1.5,.5,1) both";
    ve.style.animation = "vs-slide-in-right 0.7s cubic-bezier(.5,1.5,.5,1) both";

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
    if (vidasJugador <= 0 || vidasEnemigo <= 0) return;
    if (personajeJugador === '' || personajeEnemigo === '') return;

    const ataques = ['PUÑO', 'EMBESTIDA', 'PATADA', 'BARRIDA'];
    const indice = Math.floor(Math.random() * ataques.length);
    const ataqueEnemigo = ataques[indice];

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
            vidasEnemigo--;
            mensaje = `¡GANASTE! Tu ${ataqueJugador} derrotó a ${ataqueEnemigo}.`;
        } else {
            vidasJugador--;
            mensaje = `¡PERDISTE! Tu ${ataqueJugador} fue vencido por ${ataqueEnemigo}.`;
        }
    }

    actualizarVidasEnPantalla();
    document.getElementById("texto-mensaje").innerText = mensaje;

    if (vidasJugador <= 0 || vidasEnemigo <= 0) {
        finalizarJuego();
    }
}

// ======================
// 10) ACTUALIZAR VIDAS EN EL HTML
// ======================
function actualizarVidasEnPantalla() {
    document.getElementById("vidas-jugador").innerText = vidasJugador;
    document.getElementById("vidas-enemigo").innerText = vidasEnemigo;
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

    if (vidasJugador <= 0) {
        textoFinal.innerText = `¡HAS SIDO DERROTADO! ${personajeEnemigo} se impuso.`;
        document.getElementById("versus-jugador").classList.add("vs-perdedor");
        document.getElementById("versus-enemigo").classList.add("vs-ganador");
    } else if (vidasEnemigo <= 0) {
        textoFinal.innerText = `¡FELICITACIONES! ${personajeJugador} ganó la batalla.`;
        document.getElementById("versus-jugador").classList.add("vs-ganador");
        document.getElementById("versus-enemigo").classList.add("vs-perdedor");
    }
}

// ======================
// 12) REINICIAR JUEGO
// ======================
function reiniciarJuego() {
    document.querySelectorAll('.opcion-personaje').forEach(card => card.classList.remove('seleccionado'));

    personajeJugador = '';
    personajeEnemigo = '';
    vidasJugador = 3;
    vidasEnemigo = 3;

    document.getElementById("personaje-jugador").innerText = "";
    document.getElementById("personaje-enemigo").innerText = "";
    document.getElementById("vidas-jugador").innerText = vidasJugador;
    document.getElementById("vidas-enemigo").innerText = vidasEnemigo;
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
