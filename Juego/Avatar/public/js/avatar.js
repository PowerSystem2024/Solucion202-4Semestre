// ======================
// CLASE PERSONAJE (POO)
// ======================
class Personaje {
    constructor(nombre, imagen, ataques, vidasIniciales = 6) {
        this.nombre = nombre;
        this.imagen = imagen;
        this.ataques = ataques;
        this.vidas = vidasIniciales;
        this.vidasIniciales = vidasIniciales;
    }

    recibirDaño(puntos) {
        this.vidas -= puntos;
        if (this.vidas < 0) this.vidas = 0;
    }

    recuperarVidaCompleta() {
        this.vidas = this.vidasIniciales;
    }

    ataqueAleatorio() {
        const indice = Math.floor(Math.random() * this.ataques.length);
        return this.ataques[indice];
    }

    estaVivo() {
        return this.vidas > 0;
    }
}

// ======================
// DATOS DEL JUEGO
// ======================
const ataquesDisponibles = ['PUÑO', 'EMBESTIDA', 'PATADA', 'BARRIDA'];

const personajesDisponibles = [
    new Personaje("Zuko", "./img/zuko.jpg", ataquesDisponibles),
    new Personaje("Katara", "./img/katara.jpg", ataquesDisponibles),
    new Personaje("Aang", "./img/Aang.jpg", ataquesDisponibles),
    new Personaje("Toph", "./img/toph.jpeg", ataquesDisponibles)
];

const estadoJuego = {
    personajes: {
        jugador: null,
        enemigo: null
    },
    probabilidades: {
        critico: 0.15,
        recuperacion: 0.05
    }
};

// ======================
// FUNCIONES DRY
// ======================
function obtenerPersonajeSeleccionado(tipo) {
    for (let personaje of personajesDisponibles) {
        if (document.getElementById(`${personaje.nombre}-${tipo}`).checked) {
            return personaje.nombre;
        }
    }
    return '';
}

function resaltarTarjetaSeleccionada(tipo, nombre) {
    document.querySelectorAll(`.opcion-personaje[for$="-${tipo}"]`).forEach(card => card.classList.remove('seleccionado'));
    let label = document.querySelector(`label[for="${nombre}-${tipo}"]`);
    if (label) label.classList.add('seleccionado');
}

function setEstadoBotonesAtaque(habilitar) {
    ["boton-puño", "boton-embestida", "boton-patada", "boton-barrida"].forEach(id => {
        document.getElementById(id).disabled = !habilitar;
    });
}

// ======================
// INICIO DEL JUEGO
// ======================
function iniciarJuego() {
    document.getElementById("boton-personaje").addEventListener("click", seleccionarPersonajeJugador);
    ["puño", "embestida", "patada", "barrida"].forEach(ataque =>
        document.getElementById(`boton-${ataque}`).addEventListener("click", () => manejarAtaque(ataque.toUpperCase()))
    );

    setEstadoBotonesAtaque(false);

    document.getElementById("boton-reiniciar").addEventListener("click", reiniciarJuego);

    document.getElementById("seleccionar-ataque").style.display = 'none';
    document.getElementById("mensajes").style.display = 'none';
    document.getElementById("reiniciar").style.display = 'none';

    document.getElementById("boton-reglas").addEventListener("click", () => {
        document.getElementById("panel-reglas").style.display = "block";
    });

    document.getElementById("cerrar-reglas").addEventListener("click", () => {
        document.getElementById("panel-reglas").style.display = "none";
    });

    let btnLuchar = document.createElement("button");
    btnLuchar.id = "boton-luchar";
    btnLuchar.className = "btn btn-primario";
    btnLuchar.innerText = "Luchar";
    btnLuchar.style.display = "none";
    document.getElementById("seleccionar-enemigo").appendChild(btnLuchar);

    btnLuchar.addEventListener("click", seleccionarPersonajeEnemigo);
}

window.addEventListener('load', iniciarJuego);

// ======================
// SELECCIONAR PERSONAJE JUGADOR
// ======================
function seleccionarPersonajeJugador() {
    const nombre = obtenerPersonajeSeleccionado('jugador');
    if (!nombre) {
        alert("Por favor, selecciona un personaje.");
        return;
    }

    const personaje = personajesDisponibles.find(p => p.nombre === nombre);
    estadoJuego.personajes.jugador = personaje;
    document.getElementById('personaje-jugador').innerText = personaje.nombre;

    document.getElementById("boton-personaje").disabled = true;
    document.getElementsByName("personaje-jugador").forEach(r => r.disabled = true);

    resaltarTarjetaSeleccionada('jugador', personaje.nombre);

    const labelJugador = document.querySelector(`label[for="${personaje.nombre}-jugador"]`);
    if (labelJugador) labelJugador.style.animation = "vs-slide-in-left 0.7s cubic-bezier(.5,1.5,.5,1) both";

    document.getElementById("boton-luchar").style.display = "block";
}

// ======================
// SELECCIONAR ENEMIGO
// ======================
function seleccionarPersonajeEnemigo() {
    let nombre = obtenerPersonajeSeleccionado('enemigo');
    let enemigo;

    if (!nombre) {
        const posibles = personajesDisponibles.filter(p => p !== estadoJuego.personajes.jugador);
        enemigo = posibles[Math.floor(Math.random() * posibles.length)];
        const radio = document.getElementById(`${enemigo.nombre}-enemigo`);
        if (radio) radio.checked = true;
    } else {
        enemigo = personajesDisponibles.find(p => p.nombre === nombre);
    }

    estadoJuego.personajes.enemigo = enemigo;
    document.getElementById("personaje-enemigo").innerText = enemigo.nombre;

    const labelEnemigo = document.querySelector(`label[for="${enemigo.nombre}-enemigo"]`);
    if (labelEnemigo) labelEnemigo.style.animation = "vs-slide-in-right 0.7s cubic-bezier(.5,1.5,.5,1) both";

    resaltarTarjetaSeleccionada('enemigo', enemigo.nombre);

    document.getElementsByName("personaje-enemigo").forEach(r => r.disabled = true);

    setTimeout(() => {
        document.getElementById("seleccionar-personaje").style.display = "none";
        document.getElementById("seleccionar-enemigo").style.display = "none";
        mostrarPanelAtaque();
    }, 600);
}

// ======================
// PANEL DE ATAQUE
// ======================
function mostrarPanelAtaque() {
    const jugador = estadoJuego.personajes.jugador;
    const enemigo = estadoJuego.personajes.enemigo;

    document.getElementById("seleccionar-ataque").style.display = 'block';
    document.getElementById("mensajes").style.display = 'block';
    document.getElementById("reiniciar").style.display = 'block';

    document.getElementById("img-jugador-vs").src = jugador.imagen;
    document.getElementById("img-jugador-vs").alt = jugador.nombre;
    document.getElementById("nombre-jugador-vs").innerText = jugador.nombre;

    document.getElementById("img-enemigo-vs").src = enemigo.imagen;
    document.getElementById("img-enemigo-vs").alt = enemigo.nombre;
    document.getElementById("nombre-enemigo-vs").innerText = enemigo.nombre;

    actualizarVidasEnPantalla();
    setEstadoBotonesAtaque(true);
}

// ======================
// MANEJAR ATAQUE
// ======================
function manejarAtaque(ataqueJugador) {
    const jugador = estadoJuego.personajes.jugador;
    const enemigo = estadoJuego.personajes.enemigo;

    if (!jugador.estaVivo() || !enemigo.estaVivo()) return;

    const ataqueEnemigo = enemigo.ataqueAleatorio();
    compararAtaques(jugador, enemigo, ataqueJugador, ataqueEnemigo);
}

// ======================
// COMPARAR ATAQUES
// ======================
function compararAtaques(jugador, enemigo, ataqueJugador, ataqueEnemigo) {
    let mensaje = "";
    const textoMensaje = document.getElementById("texto-mensaje");

    if (ataqueJugador === ataqueEnemigo) {
        if (Math.random() < estadoJuego.probabilidades.recuperacion && jugador.vidas < jugador.vidasIniciales) {
            jugador.recuperarVidaCompleta();
            mensaje = `💫 ¡${jugador.nombre} recuperó toda su vida! 💫`;
            textoMensaje.style.color = "#00ff00";
        } else {
            mensaje = `¡EMPATE! Ambos usaron ${ataqueJugador}.`;
        }
    } else {
        const ganaJugador =
            (ataqueJugador === "PUÑO" && ataqueEnemigo === "PATADA") ||
            (ataqueJugador === "PATADA" && ataqueEnemigo === "BARRIDA") ||
            (ataqueJugador === "BARRIDA" && ataqueEnemigo === "EMBESTIDA") ||
            (ataqueJugador === "EMBESTIDA" && ataqueEnemigo === "PUÑO");

        const esCritico = Math.random() < estadoJuego.probabilidades.critico;
        const daño = esCritico ? 2 : 1;

        if (ganaJugador) {
            enemigo.recibirDaño(daño);
            mensaje = esCritico ?
                `⚡ ¡GOLPE CRÍTICO! ${jugador.nombre} hizo ${daño} de daño. ⚡` :
                `¡GANASTE! ${ataqueJugador} vence a ${ataqueEnemigo}.`;
            textoMensaje.style.color = esCritico ? "#ff6b00" : "";
        } else {
            jugador.recibirDaño(daño);
            mensaje = esCritico ?
                `⚡ ¡CRÍTICO RECIBIDO! ${enemigo.nombre} te hizo ${daño} de daño. ⚡` :
                `¡PERDISTE! ${ataqueJugador} pierde contra ${ataqueEnemigo}.`;
            textoMensaje.style.color = esCritico ? "#ff0000" : "";
        }
    }

    textoMensaje.innerText = mensaje;
    setTimeout(() => textoMensaje.style.color = "", 1000);

    actualizarVidasEnPantalla();
    if (!jugador.estaVivo() || !enemigo.estaVivo()) finalizarJuego();
}

// ======================
// ACTUALIZAR VIDAS
// ======================
function actualizarVidasEnPantalla() {
    document.getElementById("vidas-jugador").innerText = estadoJuego.personajes.jugador.vidas;
    document.getElementById("vidas-enemigo").innerText = estadoJuego.personajes.enemigo.vidas;
}

// ======================
// FINALIZAR JUEGO
// ======================
function finalizarJuego() {
    setEstadoBotonesAtaque(false);
    const textoFinal = document.getElementById("texto-mensaje");

    const jugador = estadoJuego.personajes.jugador;
    const enemigo = estadoJuego.personajes.enemigo;

    if (!jugador.estaVivo()) {
        textoFinal.innerText = `¡HAS SIDO DERROTADO! ${enemigo.nombre} ganó.`;
        document.getElementById("versus-jugador").classList.add("vs-perdedor");
        document.getElementById("versus-enemigo").classList.add("vs-ganador");
    } else {
        textoFinal.innerText = `¡GANASTE! ${jugador.nombre} venció a ${enemigo.nombre}.`;
        document.getElementById("versus-jugador").classList.add("vs-ganador");
        document.getElementById("versus-enemigo").classList.add("vs-perdedor");
    }
}

// ======================
// REINICIAR JUEGO
// ======================
function reiniciarJuego() {
    estadoJuego.personajes.jugador = null;
    estadoJuego.personajes.enemigo = null;

    personajesDisponibles.forEach(p => p.recuperarVidaCompleta());

    document.querySelectorAll('.opcion-personaje').forEach(card => card.classList.remove('seleccionado'));
    document.getElementsByName("personaje-jugador").forEach(r => {
        r.checked = false;
        r.disabled = false;
    });
    document.getElementsByName("personaje-enemigo").forEach(r => {
        r.checked = false;
        r.disabled = false;
    });

    document.getElementById("personaje-jugador").innerText = "";
    document.getElementById("personaje-enemigo").innerText = "";
    document.getElementById("texto-mensaje").innerText = "";

    document.getElementById("seleccionar-personaje").style.display = "block";
    document.getElementById("seleccionar-enemigo").style.display = "block";
    document.getElementById("reiniciar").style.display = "none";
    document.getElementById("mensajes").style.display = "none";
    document.getElementById("seleccionar-ataque").style.display = "none";

    setEstadoBotonesAtaque(false);
    document.getElementById("boton-personaje").disabled = false;

    let btnLuchar = document.getElementById("boton-luchar");
    if (btnLuchar) btnLuchar.style.display = "none";

    document.getElementById("versus-jugador").classList.remove("vs-ganador", "vs-perdedor");
    document.getElementById("versus-enemigo").classList.remove("vs-ganador", "vs-perdedor");
}
