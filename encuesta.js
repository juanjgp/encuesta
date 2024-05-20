// Llamamos a readline para petición de datos al usuario.
const { exit } = require('process');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

// Parte 1: presentación de preguntas al usuario.

// Presentación de la encuesta.
console.log("Bienvenido a la encuesta. ¿Cuánto sabes de Pokémon?.");
console.log("Algunas preguntas están algo rebuscadas. Para darle emoción.");
console.log("Son 5 preguntas. Responde 3 al menos para aprobar. Si respondes bien a todas te llevas una medallita.");

// Preguntas.
let questions = [
    {
        numero: 1,
        pregunta: "¿Cuántas evoluciones puede tener Poliwag?: ",
    },
    {
        numero: 2,
        pregunta: "¿Los Pokémon normales tienen desventaja con qué tipos?: ",
    },
    {
        numero: 3,
        pregunta: "Uno de los siguientes pokémon no evoluciona por cable link. ¿Cuál?: ",
    },
    {
        numero: 4,
        pregunta: "¿Cuántos perros legendarios hay?: ",
    },
    {
        numero: 5,
        pregunta: "Para evolucionar Slowpoke a Slowking hace falta algo fundamental. ¿Qué es?: ",
    }
]

// Opciones.
let options_1 = ["1", "2", "3", "Ninguna"];
let options_2 = ["Ninguno, porque son normales", "Fantasma y luchador", "Roca y Fantasma", "Agua y Eléctricos"];
let options_3 = ["Abra", "Graveler", "Kadabra", "Scyther"];
let options_4 = ["4", "3", "1", "5"];
let options_5 = ["Suficiente nivel", "Piedra agua", "Roca del rey", "Necesita evolucionar a Slowbro"];

// Listas para almacenar opciones.

let options = [options_1, options_2, options_3, options_4, options_5];

// Array que almacena las respuestas.
user_answers = [];

// Índice útil para pasar a las preguntas sucesivas una vez respondas la anterior.
let index = 0;

// Función principal para las preguntas. Según el valor de index, muestra la pregunta y opciones de la encuesta.
function main(questions, options, user_answers, index) {
    show_questions(questions[index]); // Función mostrar preguntas.
    show_options(options[index]); // Función mostrar opciones.
    answers(options, user_answers, index); // Función responder.
}

// Función presentación preguntas. Muestra la pregunta de manera ordenada.
function show_questions(questions) {
    console.log("Pregunta " + (questions.numero) + "-" + questions.pregunta);
}
          
// Función presentación opciones. Muestra una lista de las opciones de la pregunta ordenadas.
function show_options(options) {
    for (let i = 0; i < options.length; i++) {
        console.log((i + 1) + "-" + options[i]);
    };   

}
// Función respuesta. Gestiona las opciones para elegir y el almacenamiento de las mismas.
function answers(options, user_answers, index){
    rl.question('Elige una opcion: ', function(answer) {
       if (answer == 1) {
        console.log("Has elegido: " + options[index][0]);
        addanswer(user_answers, options[index][0]); // Añade la respuesta a la lista de respuestas.
        index += 1; // Se suma el índice para acceder a la siguiente pregunta y respuestas.
        end(user_answers, index, questions); // Si el índice supera el número de preguntas, se muestran las respuestas y se acaba la encuesta.
        main(questions, options, user_answers, index); // Vuelta a la función principal con un index mayor para la siguiente pregunta.
       }
       else if (answer == 2) { // Para las demás respuestas es lo mismo pero se almacena otra opción elegida.
        console.log("Has elegido: " + options[index][1]);
        addanswer(user_answers, options[index][1]);
        index += 1;
        end(user_answers, index, questions);
        main(questions, options, user_answers, index);
       }
       else if (answer == 3) {
        console.log("Has elegido: " + options[index][2]);
        addanswer(user_answers, options[index][2]);
        index += 1;
        end(user_answers, index, questions);
        main(questions, options, user_answers, index);
       }
       else if (answer == 4) {
        console.log("Has elegido: " + options[index][3]);
        addanswer(user_answers, options[index][3]);
        index += 1;
        end(user_answers, index, questions);
        main(questions, options, user_answers, index);
       } 
       else{ // Caso de elegir otra opción.
        console.log("Respuesta incorrecta. Ahora en serio, dejate de cachondeos venga.");
        main(questions, options, user_answers, index); // Se vuelve a ejecutar la función main. RECURSIVIDAD.
       }
    });
}

//  Función añadir la respuesta del usuario a una lista de respuestas. Almacena las respuestas en un array.
function addanswer(user_answers, options) {
     return user_answers.push(options);
}

// Función fin de la encuesta. Presenta el resumen de la encuesta.
function end(user_answers, index, questions){
    correct = 0; // Variable para contar las respuestas correctas.
    if (index > (questions.length - 1)) { // Si el índice supera a las preguntas. Se entra en la parte final de mostrar resultados y acabar la encuesta.
        correct_answers = ["3", "Roca y Fantasma", "Abra", "3", "Roca del rey"]; // Array de respuestas correctas.
        console.log("Tus respuestas han sido: ");
        for (let i = 0; i < user_answers.length; i++) {
            console.log("Pregunta " + (i + 1) + ": " + user_answers[i]); 
        if (user_answers[i] == correct_answers[i]){
            correct++; 
            console.log("Correcto"); // Si el array de respuesta del usuario coincide con el array de respuestas correctas se suma uno a la variable correct y se muestra que la respuesta es correcta
        }
        else{
            console.log("Incorrecto"); // Se muestra esto si no es correcto
        }
        }
        if (correct < 3) {
            console.log("Has acertado " + correct + " de " + questions.length + ". Nada ¡SUSPENDIDO!. ¿A que estaba rebuscado?."); // Se muestra un mensaje con las respuestas correctas y el resultado final de la encuesta.
        }
        else if ((correct >= 3) && (correct < 5)){
            console.log("Has acertado " + correct + " de " + questions.length + ". ¡FELICIDADES!. Has aprobado pero no eres una leyenda. No hay medallita.");
        }
        else if(correct == 5){
            console.log("Has acertado " + correct + " de " + questions.length + ". ¡GUAU!.Toda una leyenda. Aqui tienes tu medallita. No la pierdas.");
        }
        exit(); // Finaliza el programa 
    }
    else{
        console.log("Continúa respondiendo"); // Si el índice es menor al número de preguntas, la encuesta continúa.
    }    
}

// Parte principal
main(questions, options, user_answers, index);