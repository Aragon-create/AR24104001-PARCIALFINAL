// =========================
// MODALES
// =========================

function abrirModal(idModal) {
    document.getElementById(idModal).classList.add("activo");
}

function cerrarModal(idModal) {
    document.getElementById(idModal).classList.remove("activo");
}

// =========================
// VALIDACIONES
// =========================

function validarFormulario(nombre, puntos) {

    if (nombre.trim() === "") {
        mostrarError("Error: complete todos los campos.");
        return false;
    }

    if (puntos === "" || isNaN(puntos)) {
        mostrarError("Error: puntos inválidos.");
        return false;
    }

    return true;
}

// =========================
// MENSAJES
// =========================

function mostrarExito(mensaje) {

    const toast = document.createElement("div");

    toast.className = "toast exito";
    toast.textContent = mensaje;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

function mostrarError(mensaje) {

    const toast = document.createElement("div");

    toast.className = "toast error";
    toast.textContent = mensaje;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// =========================
// FELICITACIÓN FINAL
// =========================

function mostrarFelicitacion() {
    abrirModal("modalFelicitacion");
}