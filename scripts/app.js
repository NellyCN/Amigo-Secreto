// ** FUNCIONALIDADES **

let friends = []; // Array para almacenar los nombres de los amigos

const winSound = new Audio("sounds/applause.mp3");
const clickSound = new Audio("sounds/mouse-click.mp3");

// Función para mostrar mensajes de error

// Función para validar que solo se ingresen letras y espacios
function isValidName(name) {
  const regex = /^[A-Za-z\s]+$/; // Solo letras y espacios
  return regex.test(name);
}

// Función para mostrar mensajes de error
function showError(message) {
  const error = document.getElementById("error"); // Capturar el elemento de error en el DOM
  if (error) {
    error.textContent = message; // Asignar el mensaje de error
    error.style.display = "block"; // Mostrar el mensaje

    setTimeout(() => {
      error.style.display = "none"; // Ocultar el mensaje después de 3 segundos
    }, 3000); // Tiempo de espera = 3000(ms)
  } else {
    console.error("El div de mensajes de error no fue encontrado."); // Mostrar una alerta si no se encuentra el elemento
  }
}

// Función para validar que el nombre no esté vacío o repetido
function isNameValid(name) {
  return name.trim() !== "" && !friends.includes(name);
}

function updateButtons() {
  const sortearBtn = document.getElementById("sortearBtn");
  const reiniciarBtn = document.getElementById("reiniciarBtn");

  sortearBtn.disabled = friends.length < 2;
  reiniciarBtn.disabled = friends.length === 0;
}

// 1. Agregar amigos

function addFriend() {
  clickSound.play(); // Reproducir sonido de clic
  let input = document.getElementById("amigo"); // Capturar el input
  let friend = input.value.trim(); // Obtener el valor y eliminar espacios extra

  // Validar que el nombre solo contenga letras y espacios

  if (!isValidName(friend)) {
    showError("Por favor, ingresa sólo letras y espacios.");
    return;
  }

  // Convertir el nombre a mayúsculas
  friend = friend.toUpperCase();

  // Validar que el nombre no esté vacío o repetido
  if (!isNameValid(friend)) {
    showError("Por favor, ingresa un nombre válido o que no esté repetido.");
    return;
  }

  // Agregar el nombre a la lista
  friends.push(friend); // Agregar el nombre al array
  input.value = ""; // Limpiar el campo de entrada
  showList();       // Actualizar la lista de amigos
  updateButtons();  // Actualizar el estado de los botones
  
}

// Validación en tiempo real
document.getElementById("amigo").addEventListener("input", (event) => {
  const input = event.target;
  const value = input.value;

  // Validar que solo se ingresen letras y espacios
  if (!isValidName(value)) {
    input.value = value.replace(/[^A-Za-z\s]/g, ""); // Eliminar caracteres no válidos
  }
});

// Función para crear el botón de eliminar
function createDeleteButton(friend, item) {
  const deleteBtn = document.createElement("button"); // Crear un botón
  deleteBtn.classList.add("deleteBtn"); // Agregar una clase
  deleteBtn.setAttribute("aria-label", `Eliminar a ${friend}`);
  deleteBtn.setAttribute("title", `Eliminar a ${friend}`);

  // Crear el ícono de FontAwesome
  const icon = document.createElement("i");
  icon.classList.add("fas", "fa-trash-alt"); // Ícono de basura
  deleteBtn.appendChild(icon); // Agregar el ícono al botón

  deleteBtn.addEventListener("click", () => {
    // Asignar una función al evento click
    item.classList.add("fade-out"); // Agregar una clase para animación
    // Esperar a que termine la animación antes de eliminar el elemento
    setTimeout(() => {
      const index = friends.indexOf(friend); // Encontrar el índice del amigo
      friends.splice(index, 1); // Eliminar el amigo del array
      showList(); // Actualizar la lista de amigos
      updateButtons(); // Actualizar el estado de los botones
    }, 300); // Tiempo de espera para la animación = 300(ms)
  });

  return deleteBtn;
}

// Función para mostrar la lista de amigos

function showList() {
  let list = document.getElementById("listaAmigos"); // Capturar la lista
  list.innerHTML = ""; // Limpiar la lista

  friends.forEach((friend) => {
    // Recorrer el array de amigos
    let item = document.createElement("li"); // Crear un elemento <li>
    item.textContent = friend; // Asignar el nombre como contenido
    item.appendChild(createDeleteButton(friend, item));
    list.appendChild(item); // Agregar el elemento a la lista
  });
}

// 2. Sortear amigo

function drawnFriend() {
  if (friends.length < 2) {
    // Verificar que haya amigos en la lista
    showError("Agrega al menos dos amigo antes de sortear."); // Mostrar un mensaje de alerta
    return; // Salir de la función
  }

  let randomIndex = Math.floor(Math.random() * friends.length); // Generar un índice aleatorio
  let drawnFriend = friends[randomIndex]; // Obtener el amigo correspondiente
  document.getElementById(
    "resultado"
  ).innerText = `🎉 El amigo secreto es: ${drawnFriend} 🎁`;
  winSound.play();

// Deshabilitar "Sortear" y habilitar "Reiniciar" después del sorteo
  document.getElementById("sortearBtn").disabled = true;
  document.getElementById("limpiarBtn").disabled = false;
}


// 3. Limpiar lista

function clearList() {
  clickSound.play();

  if (friends.length === 0) {
    showError("La lista ya está vacía."); // Mensaje si la lista está vacía
    return;
  }

  // Animación de salida
  const lista = document.getElementById("listaAmigos");
  lista.classList.add("fade-out"); // Aplicar animación

  setTimeout(() => {
    friends = []; // Limpiar el array de amigos
    document.getElementById("resultado").innerText = ""; // Limpiar resultado del sorteo
    showList(); // Actualizar lista de amigos
    lista.classList.remove("fade-out"); // Eliminar animación después de limpiar
    showError("La lista se ha limpiado correctamente."); // Mensaje de confirmación

    // Habilitar "Sortear" y deshabilitar "Reiniciar" después de limpiar
    document.getElementById("sortearBtn").disabled = false;
    document.getElementById("limpiarBtn").disabled = true;
  }, 300); // Tiempo de espera para la animación = 300(ms)
}

// Vincular eventos a los botones
document.getElementById("sortearBtn").addEventListener("click", drawnFriend);
document.getElementById("limpiarBtn").addEventListener("click", clearList);

// Actualizar el estado de los botones al cargar la página
document.addEventListener("DOMContentLoaded", updateButtons);
