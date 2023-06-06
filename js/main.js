//compropbar si el nuevo imput existe en la base de datos
const registerForm = document.querySelector('#anotador')
registerForm.addEventListener('submit', getDataForm)

function saveTarea(pList, pTarea) {
    if (pList.length === 0) {
        sectionPendientes.innerHTML = ''
    }
    let duplicado = pList.findIndex(tarea => tarea.titulo === pTarea.titulo)
    if (duplicado === -1) { //si no encuentra
        //puedo hacer push
        pList.push(pTarea)
        return 'tarea guardada'
    }
    //si encuentra, no puedo hacer push
    return 'tarea repetida'
}




/* <article class="urgente">
            <p>Estudiar Javascript</p>
            <button class="btn">Eliminar</button>
        </article> */

const sectionPendientes = document.querySelector('#pendientes')



//borrar del array
function deleteItemArray(pTitulo, pList) {
    let elementoBorrar = pList.findIndex(tarea => tarea.titulo === pTitulo)
    if (elementoBorrar !== -1) {
        pList.splice(elementoBorrar, 1)
    }
}


//funcion borrar
//borrar del dom
function deleteItem(event) {
    let titulo = event.target.dataset.titulo
    const articleDelete = event.target.parentNode //un solo "quien es tu padre", porque solo tengo que subir un nodo
    articleDelete.parentNode.removeChild(articleDelete)
    //borrar del array
    deleteItemArray(titulo, tareas) //creo la funcion arriba
    printTareas(tareas, sectionPendientes)
}




//crear el article
function printOneTarea(pTarea, pDom) {
    const article = document.createElement('article')
    const pTitulo = document.createElement('p')
    const pBoton = document.createElement('button')


    article.className = 'rounded mb-2'
    article.classList.add(pTarea.prioridad)

    pTitulo.textContent = pTarea.titulo

    pBoton.classList.add('btn')
    pBoton.textContent = 'Eliminar'
    pBoton.dataset.titulo = pTarea.titulo
    pBoton.addEventListener('click', deleteItem)

    article.append(pTitulo, pBoton)
    pDom.append(article)
}


function comprobarForm(pForm, tareas) {
    const titulo = pForm.titulo.value;
    const prioridad = pForm.prioridad.value;

    // Verificar campos vacíos
    if (titulo === '' || prioridad === '') {
        return 'vacio';
    }

    // Verificar tarea repetida
    const tareaRepetida = tareas.find(tarea => tarea.titulo === titulo);
    if (tareaRepetida) {
        return 'repetido';
    }

    return 'correcto';
}


function getDataForm(event) {
    event.preventDefault();

    const mensajeErrorVacio = 'Los campos no pueden estar vacíos! Escribe una tarea Y selecciona una prioridad';
    const mensajeErrorRepetido = 'Tarea repetida.';

    const inputTitulo = document.querySelector('#tarea');
    const mensajeTarea = document.querySelector('#mensajeTarea');
    const inputPrioridad = document.querySelector('#prioridad');

    const validacion = comprobarForm(event.target, tareas)
    if (validacion === 'correcto') {
        const newTarea = {
            titulo: event.target.titulo.value,
            prioridad: event.target.prioridad.value
        }

        let guardado = saveTarea(tareas, newTarea);

        if (guardado === 'tarea guardada') {
            printOneTarea(newTarea, sectionPendientes);
            event.target.reset();

            inputTitulo.classList = 'form-control';
            inputPrioridad.classList = 'form-control';
            mensajeTarea.textContent = '';
        }

    } else {
        if (validacion === 'repetido') {
            mensajeTarea.textContent = mensajeErrorRepetido;
        } else {
            mensajeTarea.textContent = mensajeErrorVacio;
        }

        inputTitulo.classList = 'form-control is-invalid';
        inputPrioridad.classList = 'form-control is-invalid';
        event.target.reset();
    }
}

//pintar tareas
function printTareas(pList, pDom) {
    pDom.innerHTML = ''
    if (pList.length !== 0) {
        pList.forEach(tarea => printOneTarea(tarea, pDom))
    } else {
        pDom.innerHTML = '<div class="lead bg-body-secondary rounded mt-2 mb-2 pt-4 pb-2 text-center"><p class="enhorabuena">Lo tienes todo hecho. Puedes ir a ver Netflix.</p></div>' //vaya chorizo te he metío
    }
}

printTareas(tareas, sectionPendientes)




//capturar el selector de prioridad, recoger su valor y filtrar el array para luego pintar

const selectPrioridad = document.querySelector('#selector')

function getPrioridad(event) {

    let listaFiltrada = filterTareasByPriority(tareas, event.target.value);
    printTareas(listaFiltrada, sectionPendientes);
}


selectPrioridad.addEventListener('change', getPrioridad);



// capturar el input de buscadortarea, recoger su valor, filtrar por tarea y pintar.


const inputTitulo = document.querySelector('#buscadorTarea');

inputTitulo.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        getTarea(event);
        inputTitulo.value = "";
    }
});

function getTarea(event) {
    if (event.key === 'Enter') {
        let palabraBuscar = event.target.value;
        let listaFiltrada = filterByWord(tareas, palabraBuscar);
        printTareas(listaFiltrada, sectionPendientes);
    }
}

inputTitulo.addEventListener('input', getTarea);