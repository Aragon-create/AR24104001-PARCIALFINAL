// ===============================
// DATOS INICIALES
// ===============================

let idEditando = null;

let integrantes = [
  {
    id: 1,
    nombre: "Nombre Completo",
    codigo: "AR241040",
    expediente: "EX001",
    rol: "Líder del Proyecto",
    foto: "imgs/equipo/integrante01.jpg"
  },
  {
    id: 2,
    nombre: "Nombre Completo",
    codigo: "AR000000",
    expediente: "EX002",
    rol: "Drag & Drop",
    foto: "imgs/equipo/integrante02.jpg"
  },
  {
    id: 3,
    nombre: "Nombre Completo",
    codigo: "AR000000",
    expediente: "EX003",
    rol: "CRUD de Útiles",
    foto: "imgs/equipo/integrante03.jpg"
  },
  {
    id: 4,
    nombre: "Karen Daniela Pérez Alarcón",
    codigo: "PA24-I04-002",
    expediente: "27243",
    rol: "CRUD de Integrantes",
    foto: "imgs/equipo/KarenDanielaPerezAlarcon.jpeg"
  },
  {
    id: 5,
    nombre: "Martha Daniela Murga Cubias",
    codigo: "MC24-I04-001",
    expediente: "27874",
    rol: "Integración y Pruebas",
    foto: "imgs/equipo/MarthaDanielaMurgaCubias.jpeg"
  }
];

// ===============================
// DOM
// ===============================

const contenedor = document.getElementById("contenedorIntegrantes");
const form = document.getElementById("formIntegrante");

// ===============================
// RENDER
// ===============================

function render() {

  if (!contenedor) return;

  contenedor.innerHTML = "";

  integrantes.forEach(i => {

    const card = document.createElement("article");
    card.classList.add("tarjeta-integrante");

    card.innerHTML = `
      <img src="${i.foto}" alt="${i.nombre}">
      <h3>${i.nombre}</h3>

      <p><strong>Código:</strong> ${i.codigo}</p>
      <p><strong>Expediente:</strong> ${i.expediente}</p>
      <p><strong>Rol:</strong> ${i.rol}</p>

      <div class="acciones">
        <button class="btn-editar" onclick="editar(${i.id})">Editar</button>
        <button class="btn-eliminar" onclick="eliminar(${i.id})">Eliminar</button>
      </div>
    `;

    contenedor.appendChild(card);
  });
}

// ===============================
// AGREGAR
// ===============================

function agregar(e) {
  e.preventDefault();

  const nombre = document.getElementById("intNombre").value.trim();
  const codigo = document.getElementById("intCodigo").value.trim();
  const expediente = document.getElementById("intExpediente").value.trim();
  const rol = document.getElementById("intRol").value.trim();

  if (!nombre || !codigo || !expediente || !rol) {
    mostrarMensaje("Todos los campos son obligatorios", "error");
    return;
  }

  const existe = integrantes.some(i => i.codigo === codigo);
  if (existe) {
    mostrarMensaje("Ese código ya existe", "error");
    return;
  }

  const nuevo = {
    id: Date.now(),
    nombre,
    codigo,
    expediente,
    rol,
    foto: "imgs/equipo/default.jpg"
  };

  integrantes.push(nuevo);

  form.reset();
  render();

  mostrarMensaje("Integrante agregado correctamente", "exito");
}

// ===============================
// EDITAR
// ===============================

function editar(id) {

  const i = integrantes.find(x => x.id === id);
  if (!i) return;

  idEditando = id;

  document.getElementById("editNombre").value = i.nombre;
  document.getElementById("editRol").value = i.rol;

  document.getElementById("modalEditar").style.display = "flex";
  document.body.style.overflow = "hidden";
}

// ===============================
// ELIMINAR
// ===============================

function eliminar(id) {

  integrantes = integrantes.filter(x => x.id !== id);
  render();
  mostrarMensaje("Integrante eliminado", "exito");
}

// ===============================
// GUARDAR EDICIÓN
// ===============================

function guardarEdicion() {

  const i = integrantes.find(x => x.id === idEditando);
  if (!i) return;

  i.nombre = document.getElementById("editNombre").value.trim();
  i.rol = document.getElementById("editRol").value.trim();

  cerrarModal();
  render();

  mostrarMensaje("Integrante actualizado", "exito");
}

// ===============================
// MODAL
// ===============================

function cerrarModal() {
  document.getElementById("modalEditar").style.display = "none";
  document.body.style.overflow = "auto";
}

// ===============================
// EVENTOS
// ===============================

if (form) {
  form.addEventListener("submit", agregar);
}

render();

// ===============================
// MENSAJES (SEGURO)
// ===============================

function mostrarMensaje(texto, tipo = "exito") {

  const mensaje = document.getElementById("mensaje");

  if (!mensaje) {
    console.log(texto);
    return;
  }

  mensaje.textContent = texto;
  mensaje.className = "mensaje " + tipo;
  mensaje.style.display = "block";

  setTimeout(() => {
    mensaje.style.display = "none";
  }, 2000);
}

// ===============================
// MOCHILA (DRAG & DROP)
// ===============================

let mochila = [];

function iniciarDrag(event) {
  event.dataTransfer.setData("text", event.target.dataset.nombre);
}

function permitirDrop(event) {
  event.preventDefault();
}

function soltarUtil(event) {
  event.preventDefault();

  const nombre = event.dataTransfer.getData("text");

  if (mochila.includes(nombre)) {
    mostrarMensaje("Ya está en la mochila", "error");
    return;
  }

  mochila.push(nombre);

  mostrarMensaje(nombre + " agregado a la mochila", "exito");

  console.log("Mochila:", mochila);
}