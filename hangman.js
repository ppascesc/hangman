//ABECEDARIO
let abecedarioDiv = document.getElementById("abecedario");
let letrasSeleccionadas = [];
let palabraAdivinar = '';

function configurarEventoTeclado() { //para asociar las teclas AZ y Ñ
    document.addEventListener("keydown", function(event) {
        let letra = event.key.toUpperCase();

        if ((letra >= "A" && letra <= "Z") || letra === "Ñ") {
            let boton;
            if (letra === "Ñ") {
                boton = document.querySelector("#abecedario button:nth-child(27)"); // Ñ es el botón 27
            } else {
                boton = document.querySelector("#abecedario button:nth-child(" + (letra.charCodeAt(0) - 64) + ")");
            }
            if (boton && boton.style.display !== "none") {
                boton.click();
            }
        }
    });
}

function crearBoton(letra) { //botones abecedario para que vayan desapareciendo 
    let boton = document.createElement("button");
    boton.textContent = letra;
    boton.addEventListener("click", function() {
        if (!letrasSeleccionadas.includes(letra)) {
            letrasSeleccionadas.push(letra);
            boton.style.display = "none";
            if (!palabraAdivinar.includes(letra)) { //no te deja repetir la letra si ya la has seleccionado
                mostrarParteSiguiente(); 
            }
            letraClickeada(letra); 
        }
    });
    return boton;
}

for (let i = 97; i <= 122; i++) { //llama a la función de antes para crear AZ
    let letra = String.fromCharCode(i).toUpperCase();
    if (letra !== "Ñ") {
        let boton = crearBoton(letra);
        abecedarioDiv.appendChild(boton);
    }
}

let botonÑ = crearBoton("Ñ"); //llama a la función de antes para crear Ñ
abecedarioDiv.appendChild(botonÑ);

configurarEventoTeclado(); 

// DIBUJO HOMBRE
const partesCuerpo = ['head', 'torso', 'leftarm', 'rightarm', 'leftleg', 'rightleg'];

partesCuerpo.forEach(parte => {
    document.querySelector(`.${parte}`).classList.add('oculto');//oculta el cuerpo antes de iniciar
});

function mostrarParteCuerpo(parte) {
    document.querySelector(`.${parte}`).classList.remove('oculto'); //Muestra la parte del cuerpo
}

let intentosFallidos = 0;

function mostrarParteSiguiente() { //Muestra la siguiente parte del cuerpo del ahorcado si el jugador selecciona una letra que no está en la palabra.
    let parteVisible = partesCuerpo.find(parte => document.querySelector(`.${parte}`).classList.contains('oculto'));
    if (parteVisible) {
        mostrarParteCuerpo(parteVisible);
        intentosFallidos++; 
        if (intentosFallidos === partesCuerpo.length) {
            alert("¡Oh no! You lost. The correct word was: " + palabraAdivinar); //si se ve el hombre entero has perdido
        }
    }
}

// GUIONES
function pedirPalabra() { //jugador 1 inserta palabra
    let palabra;
    do {
        palabra = prompt("Player 1, introduce a word for Player 2 to guess:");
        palabra = palabra ? palabra.trim().toUpperCase() : ''; // Si el jugador cancela el prompt, palabra se convierte en una cadena vacía hasta que lo rellenes
    } while (!palabra);

    return palabra.replace(/\s/g, '');
}

function letraClickeada(letra) { //Verifica si la letra seleccionada está en la palabra a adivinar
    let palabraArray = palabraAdivinar.split(""); 
    let palabraMostradaArray = palabraAdivinarDiv.textContent.split(" "); 

    for (let i = 0; i < palabraArray.length; i++) { //actualiza la representación de la palabra a adivinar mostrando las letras que han sido adivinadas 
        if (palabraArray[i] === letra) {
            palabraMostradaArray[i] = letra; 
        }
    }

    palabraAdivinarDiv.textContent = palabraMostradaArray.join(" ");
    if (palabraMostradaArray.join("") === palabraAdivinar) {
        alert("¡Congratulations! You won! The word was: " + palabraAdivinar);
    }
}

// REINICIAR JUEGO
// Función para reiniciar el juego
function reiniciarJuego() {
    abecedarioDiv.innerHTML = ""; 
    letrasSeleccionadas = [];
    intentosFallidos = 0;
    crearBotonesAbecedario(); 
    ocultarPartesCuerpo();
    actualizarPalabraAdivinar(); 
    mostrarBotonReinicio(); 
    configurarEventoTeclado(); 
    reiniciarTemporizador();
}

// Crea los botones del abecedario
function crearBotonesAbecedario() {
    for (let i = 65; i <= 90; i++) {
        let letra = String.fromCharCode(i);
        let boton = crearBoton(letra);
        abecedarioDiv.appendChild(boton);
    }
    // Añadir botón para la letra "Ñ"
    let botonÑ = crearBoton("Ñ");
    abecedarioDiv.appendChild(botonÑ);
}

// Oculta las partes del cuerpo del ahorcado
function ocultarPartesCuerpo() {
    partesCuerpo.forEach(parte => {
        document.querySelector(`.${parte}`).classList.add('oculto');
    });
}

// Actualiza la palabra a adivinar
function actualizarPalabraAdivinar() {
    palabraAdivinar = pedirPalabra();
    palabraAdivinarDiv.textContent = "_ ".repeat(palabraAdivinar.length);
}

// Muestra el botón de reinicio
function mostrarBotonReinicio() {
    reiniciarBtn.style.display = "inline";
}

// Crea botón de reinicio
let reiniciarBtn = document.createElement("button");
reiniciarBtn.textContent = "Play Again";
reiniciarBtn.classList.add("reinicio");
reiniciarBtn.addEventListener("click", reiniciarJuego);
document.body.appendChild(reiniciarBtn);

// Obtiene elemento de la palabra a adivinar y actualizar
let palabraAdivinarDiv = document.getElementById("palabraAdivinar");
actualizarPalabraAdivinar();

//TEMPORIZADOR 

let timeLeft = 60;
let timer;

function iniciarTemporizador() {
    timer = setInterval(function(){
        if(timeLeft <= 0){
            clearInterval(timer);
            alert("Time's Up! Play Again");
            reiniciarJuego();
        } else{
            document.getElementById('countdown').textContent = timeLeft;
            timeLeft--;
        }
    },1000);
}

function reiniciarTemporizador() {
    clearInterval(timer);
    timeLeft = 60;
    iniciarTemporizador();
}

iniciarTemporizador();
