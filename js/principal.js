// ===============================
// DATOS INICIALES
// ===============================

let idEditando = null;
let utiles = [
{
    id:1,
    emoji:"📔",
    nombre:"Cuaderno Cuadriculado",
    tipo:"Útil Escolar",
    puntos:1
},
{
    id:2,
    emoji:"🍎",
    nombre:"Manzana Saludable",
    tipo:"Útil Escolar",
    puntos:1
},
{
    id:3,
    emoji:"🖍️",
    nombre:"Estuche de Colores",
    tipo:"Útil Escolar",
    puntos:1
},
{
    id:4,
    emoji:"📘",
    nombre:"Libro de Matemática",
    tipo:"Útil Escolar",
    puntos:1
},
{
    id:5,
    emoji:"✏️",
    nombre:"Lápiz",
    tipo:"Útil Escolar",
    puntos:1
},
{
    id:6,
    emoji:"📐",
    nombre:"Regla",
    tipo:"Útil Escolar",
    puntos:1
},
{
    id:7,
    emoji:"🥪",
    nombre:"Almuerzo Escolar",
    tipo:"Útil Escolar",
    puntos:1
},
{
    id:8,
    emoji:"🎮",
    nombre:"Consola Nintendo Switch",
    tipo:"Distractor",
    puntos:-2
},
{
    id:9,
    emoji:"📱",
    nombre:"Celular",
    tipo:"Distractor",
    puntos:-2
},
{
    id:10,
    emoji:"🎧",
    nombre:"Audífonos",
    tipo:"Distractor",
    puntos:-2
}
];
let integrantes = [
  {
    id: 1,
    nombre: "Stiven Humberto Aragón Rivera ",
    codigo: "AR24-I04-001",
    expediente: "27545",
    rol: "Líder del Proyecto",
    foto: "imgs/equipo/WhatsApp Image 2026-04-30 at 3.45.59 PM (1).jpeg"
  },
  {
    id: 2,
    nombre: "Lorena Yamileth Morales Hernandez",
    codigo: "MH24-I04-003",
    expediente: "27347",
    rol: "Drag & Drop",
    foto: "imgs/equipo/Lorena Yamileth Morales Hernandez.jpeg"
  },
  {
    id: 3,
    nombre: "Nayeli Ester Esquivel Estupinian",
    codigo: "EE24-104-001",
    expediente: "27211",
    rol: "CRUD de Útiles",
    foto: "imgs/equipo/Nayeli Ester Esquivel Estupinian.jpeg"
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

const tablaUtiles =
document.getElementById("tablaUtiles");

const formUtil =
document.getElementById("formUtil");

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

    const nombre =
        event.dataTransfer.getData("text");

    if (mochila.includes(nombre)) {

        mostrarMensaje(
            "Ese útil ya está en la mochila",
            "error"
        );

        return;
    }

    mochila.push(nombre);

    const zona =
        document.getElementById("zonaDrop");

    if (mochila.length === 1) {
        zona.innerHTML = "";
    }

    const item =
        document.createElement("div");

    item.classList.add("item-mochila");

    item.innerHTML = `
    ${nombre}
    <button onclick="quitarUtil('${nombre}')">❌</button>
`;

    zona.appendChild(item);

    actualizarPuntaje();

    mostrarMensaje(
        nombre + " agregado a la mochila",
        "exito"
    );
}
// Actualizar puntaje dinámico según arreglo global
function actualizarPuntaje() {
    let puntos = 0;

    mochila.forEach(nombre => {
        const util = utiles.find(u => u.nombre === nombre);
        if(util){
            puntos += util.puntos;
        }
    });

    const lblPuntaje = document.getElementById("puntaje");
    if(lblPuntaje){
        lblPuntaje.textContent = puntos + " Pts";
    }
}

// Validar mochila con arreglo global
function validarMochila() {
    // Verificar si hay distractores
    const tieneDistractor = mochila.some(nombre => {
        const util = utiles.find(u => u.nombre === nombre);
        return util && util.tipo === "Distractor";
    });

    // Verificar si todos los elementos en la mochila son útiles escolares
    const todosSonUtiles = mochila.every(nombre => {
        const util = utiles.find(u => u.nombre === nombre);
        return util && util.tipo === "Útil Escolar";
    });

    if (mochila.length > 0 && todosSonUtiles && !tieneDistractor) {
        mostrarMensaje("🎉 Mochila lista y perfecta 🎉", "exito");
    } else {
        mostrarMensaje("❌ Revisa los útiles de la mochila", "error");
    }
}



function quitarUtil(nombre) {

    mochila = mochila.filter(
        item => item !== nombre
    );

    const zona =
        document.getElementById("zonaDrop");

    zona.innerHTML = "";

    if (mochila.length === 0) {

        zona.innerHTML =
            "<p>Arrastra los útiles aquí</p>";

    } else {

        mochila.forEach(item => {

            const div =
                document.createElement("div");

            div.classList.add("item-mochila");

            div.innerHTML = `
                ${item}
                <button onclick="quitarUtil('${item}')">
                    ❌
                </button>
            `;

            zona.appendChild(div);
        });
    }

    actualizarPuntaje();

    mostrarMensaje(
        nombre + " eliminado",
        "error"
    );
}
// ===============================
// CRUD DE ÚTILES
// ===============================

let idUtilEditando = null;
let idEliminarUtil = null;

// RENDER
function renderUtiles() {
    if (!tablaUtiles) return;

    tablaUtiles.innerHTML = "";

    utiles.forEach(util => {
        tablaUtiles.innerHTML += `
        <tr>
            <td>${util.emoji}</td>
            <td>${util.nombre}</td>
            <td>${util.tipo}</td>
            <td>${util.puntos}</td>
            <td>
                <button class="btn-editar" onclick="editarUtil(${util.id})">Editar</button>
                <button class="btn-eliminar" onclick="eliminarUtil(${util.id})">Eliminar</button>
            </td>
        </tr>
        `;
    });
}
function renderMesaUtiles() {
    const contenedor = document.querySelector(".contenedor-utiles");
    if(!contenedor) return;

    contenedor.innerHTML = "";

    utiles.forEach(u => {
        const card = document.createElement("article");
        card.classList.add("tarjeta-util");
        card.setAttribute("draggable", "true");
        card.setAttribute("ondragstart", "iniciarDrag(event)");
        card.dataset.nombre = u.nombre;

        card.innerHTML = `
            <div class="emoji">${u.emoji}</div>
            <h3>${u.nombre}</h3>
            <span class="etiqueta ${u.tipo === "Útil Escolar" ? "util" : "distractor"}">
                ${u.tipo.toUpperCase()}
            </span>
        `;

        contenedor.appendChild(card);
    });
}

// AGREGAR
if (formUtil) {
    formUtil.addEventListener("submit", function(e){
        e.preventDefault();

        const nombre = document.getElementById("nombre").value.trim();
        const emoji = document.getElementById("emoji").value.trim();
        const tipo = document.getElementById("tipo").value;
        const puntos = parseInt(document.getElementById("puntos").value);

        if (!nombre || !emoji) {
            mostrarMensaje("Complete todos los campos", "error");
            return;
        }

        utiles.push({
            id: Date.now(),
            emoji,
            nombre,
            tipo,
            puntos
        });

        formUtil.reset();
        renderUtiles();
        mostrarMensaje("Registro agregado correctamente", "exito");
    });
}
renderUtiles();
renderMesaUtiles();


// EDITAR
function editarUtil(id){
    const util = utiles.find(u => u.id === id);
    if(!util) return;

    idUtilEditando = id;
    document.getElementById("editarNombre").value = util.nombre;
    document.getElementById("editarPuntos").value = util.puntos;

    document.getElementById("modalEditar").style.display = "flex";
}

function guardarEdicionUtil(){
    const util = utiles.find(u => u.id === idUtilEditando);
    if(!util) return;

    util.nombre = document.getElementById("editarNombre").value.trim();
    util.puntos = parseInt(document.getElementById("editarPuntos").value);

    cerrarModal("modalEditar");
    renderUtiles();
    mostrarMensaje("Registro actualizado", "exito");
}
renderUtiles();
renderMesaUtiles();


// ELIMINAR
function eliminarUtil(id){
    idEliminarUtil = id;
    document.getElementById("modalEliminar").style.display = "flex";
}

function confirmarEliminarUtil(){
    utiles = utiles.filter(util => util.id !== idEliminarUtil);
    cerrarModal("modalEliminar");
    renderUtiles();
    mostrarMensaje("Registro eliminado", "exito");
}
renderUtiles();
renderMesaUtiles();


// CERRAR MODALES
function cerrarModal(id){
    document.getElementById(id).style.display = "none";
}

// INICIAR
render();
renderUtiles();
renderMesaUtiles();
