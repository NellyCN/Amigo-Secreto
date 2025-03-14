// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.
// Aplicación que permita a los usuarios ingresar nombres de amigos en una lista para luego realizar un sorteo aleatorio y determinar quién es el "amigo secreto".
//El usuario deberá agregar nombres mediante un campo de texto y un botón "Adicionar". Los nombres ingresados se mostrarán en una lista visible en la página, y al finalizar, un botón "Sortear Amigo" seleccionará uno de los nombres de forma aleatoria, mostrando el resultado en pantalla.

// ** FUNCIONALIDADES **

// 1. Agregar amigos

// Tareas específicas:
// Agregar nombres: Crear una función addFriend() que se ejecute al hacer clic en el botón "Adicionar".
// Validar la entrada: Implementar una validación para asegurarse de que el campo no esté vacío. Si está vacío, mostrar un alert con un mensaje de error: "Por favor, inserte un nombre."
// Actualizar el array de amigos: Si el valor es válido, añadirlo al arreglo que almacena los nombre de amigos usando el método.push().
// Limpiar el campo de entrada: Después de añadir el nombre, restablecer el campo de texto a una cadena vacía.
// Capturar el valor del campo de entrada: Utilizar document.getElementById o document.querySelector para obtener el texto ingresado por el usuario.

let friends = []; // Array para almacenar los nombres de los amigos

const winSound = new Audio("sounds/applause.mp3");
const clickSound = new Audio("sounds/mouse-click.mp3");

function addFriend() {
    let input = document.getElementById("amigo");    // Capturar el input
    let friend = input.value.trim();                // Obtener el valor y eliminar espacios extra
    console.log("nuevoAmigo", friend);

    if (friend === "") {                            // Verificar que no esté vacío
        alert("Por favor, inserte un nombre válido o que no esté repetido.");
        return;
    } else {
        friends.push(friend);                       // Agregar el nombre al array
        console.log("amigos", friends);
        input.value = "";                           // Limpiar el campo de entrada
        showList();                                 // Actualizar la lista de amigos
    }
}

function showList() {
    let list = document.getElementById("listaAmigos"); // Capturar la lista
    list.innerHTML = "";                                // Limpiar la lista

    friends.forEach((friend) => {                       // Recorrer el array de amigos
        let item = document.createElement("li");         // Crear un elemento <li>
        item.textContent = friend;                       // Asignar el nombre como contenido
    
        
        // 5. Borrar amigo

        // Tareas específicas:

        // Crear el botón "Borrar Amigo" por cada amigo agregado a la lista.
        // Capturar el índice del amigo: Utilizar el método indexOf() para encontrar la posición del amigo en el array.
        // Eliminar el amigo: Utilizar el método splice() para eliminar el amigo del array.
        // Actualizar la lista: Mostrar la lista actualizada después de borrar el amigo.
        // Asignar la función al evento click: Utilizar el método addEventListener para asignar la función al evento click del botón.
        const deleteBtn = document.createElement("button"); // Crear un botón
        deleteBtn.classList.add("deleteBtn");                // Agregar una clase
        
        // Crear el ícono de FontAwesome
        const icon = document.createElement("i");
        icon.classList.add("fas", "fa-trash-alt"); // Ícono de basura
        deleteBtn.appendChild(icon); // Agregar el ícono al botón

        
        item.appendChild(deleteBtn);                         // Agregar el botón al elemento <li>

        deleteBtn.addEventListener("click", () => {         // Asignar una función al evento click
            item.classList.add("delete");                   // Agregar una clase para animación
            // Esperar a que termine la animación antes de eliminar el elemento
            setTimeout(() => {
                const index = friends.indexOf(friend);          // Encontrar el índice del amigo
                friends.splice(index, 1);                       // Eliminar el amigo del array
                showList();                                     // Actualizar la lista de amigos
            }, 300);                                      // Tiempo de espera para la animación = 300(ms)
        });

        list.appendChild(item);                          // Agregar el elemento a la lista
    });
}

// 2. Sortear amigo

// Tareas específicas:

// Sortear amigo: Crear una función que se ejecute al hacer clic en el botón "Sortear Amigo".
// Seleccionar un amigo aleatorio: Utilizar Math.random() para generar un número aleatorio y Math.floor() para redondearlo.
// Mostrar el amigo seleccionado: Mostrar el nombre del amigo seleccionado en la página.
// Capturar el botón "Sortear Amigo": Utilizar document.getElementById o document.querySelector para obtener el botón.
// Asignar la función al evento click: Utilizar el método addEventListener para asignar la función al evento click del botón.

function drawnFriend() {
    if (friends.length === 0) {                                    // Verificar que haya amigos en la lista
        alert("Agrega al menos un amigo antes de sortear.");      // Mostrar un mensaje de alerta
        return;                                                   // Salir de la función
    }

    let randomIndex = Math.floor(Math.random() * friends.length); // Generar un índice aleatorio
    let drawnFriend = friends[randomIndex];                      // Obtener el amigo correspondiente
    document.getElementById("resultado").innerText = `🎉 El amigo secreto es: ${drawnFriend} 🎁`; 
    winSound.play();

}

document.getElementById("sortearBtn").addEventListener("click", drawnFriend); // Asignar la función al botón "Sortear Amigo"


// 3. Limpiar lista

// Tareas específicas:

// Limpiar lista: Crear una función que se ejecute al hacer clic en el botón "Limpiar Lista".
// Limpiar el array de amigos: Utilizar el método splice() para eliminar todos los elementos del array.
// Limpiar la lista visible: Actualizar la lista de amigos para que esté vacía.
// Capturar el botón "Limpiar Lista": Utilizar document.getElementById o document.querySelector para obtener el botón.
// Asignar la función al evento click: Utilizar el método addEventListener para asignar la función al evento click del botón.

function clearList() {
    clickSound.play();
    if (friends.length === 0) {
        alert("La lista ya está vacía."); // Mensaje si la lista está vacía
        return;
    }

    // Animación de salida
    const lista = document.getElementById("listaAmigos");
    lista.classList.add("fade-out"); // Aplicar animación
    
    setTimeout(() => {
        friends = [];        // Limpiar el array de amigos
        document.getElementById("resultado").innerText= ""; // Limpiar resultado del sorteo
        showList();          // Actualizar lista de amigos
        lista.classList.remove("fade-out"); // Eliminar animación después de limpiar
        alert("La lista se ha limpiado correctamente."); // Mensaje de confirmación
    }, 300);      // Tiempo de espera para la animación = 300(ms)
}

document.getElementById("limpiarBtn").addEventListener("click", clearList); // Asignar la función al botón "Limpiar Lista"



