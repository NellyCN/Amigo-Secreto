// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.
// Aplicación que permita a los usuarios ingresar nombres de amigos en una lista para luego realizar un sorteo aleatorio y determinar quién es el "amigo secreto".
//El usuario deberá agregar nombres mediante un campo de texto y un botón "Adicionar". Los nombres ingresados se mostrarán en una lista visible en la página, y al finalizar, un botón "Sortear Amigo" seleccionará uno de los nombres de forma aleatoria, mostrando el resultado en pantalla.

// Fucionalidades:
// Agregar nombres: Los usuarios escribirán el nombre de un amigo en un campo de texto y lo agregarán a una lista visible al hacer clic en "Adicionar".

// Validar entrada: Si el campo de texto está vacío, el programa mostrará una alerta pidiendo un nombre válido.

// Visualizar la lista: Los nombres ingresados aparecerán en una lista debajo del campo de entrada.

// Sorteo aleatorio: Al hacer clic en el botón "Sortear Amigo", se seleccionará aleatoriamente un nombre de la lista y se mostrará en la página.


// ** FUNCIONALIDADES **
// 1. Agregar nombres
//Declaro una variable de tipo array, que almacenará los nombres de los amigos ingresados.

let friends = [];

// Tareas específicas:
// Agregar nombres: Crear una función addFriend() que se ejecute al hacer clic en el botón "Adicionar".
// Validar la entrada: Implementar una validación para asegurarse de que el campo no esté vacío. Si está vacío, mostrar un alert con un mensaje de error: "Por favor, inserte un nombre."
// Actualizar el array de amigos: Si el valor es válido, añadirlo al arreglo que almacena los nombre de amigos usando el método.push().
// Limpiar el campo de entrada: Después de añadir el nombre, restablecer el campo de texto a una cadena vacía.
// Capturar el valor del campo de entrada: Utilizar document.getElementById o document.querySelector para obtener el texto ingresado por el usuario.

function addFriend() {
    let input = document.getElementById("amigo");    // Capturar el input
    let friend = input.value.trim();                // Obtener el valor y eliminar espacios extra
    console.log("nuevoAmigo", friend);

    if (friend === "") {                            // Verificar que no esté vacío
                alert("Por favor, inserte un nombre válido.");
        return;
    } else {
        friends.push(friend);                       // Agregar el nombre al array
        console.log("amigos", friends);
        input.value = "";                           // Limpiar el campo de entrada
    }
}


