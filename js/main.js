//compropbar si el nuevo imput existe en la base de datos
const registerForm = document.querySelector('#anotador')
registerForm.addEventListener('submit', getDataForm)

function saveTarea(pList, pTarea) {
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


function comprobarForm(pForm) {
    return pForm.titulo.value !== '' && pForm.prioridad.value !== ''
}

function getDataForm(event) {
    //es formulario, por lo tanto:
    event.preventDefault()

    if (comprobarForm(event.target)) {
        const newTarea = {
            titulo: event.target.titulo.value,
            prioridad: event.target.prioridad.value
        }

        //guardar la tarea en el array
        let guardado = saveTarea(tareas, newTarea)
        //imprimirlo
        if (guardado === 'tarea guardada') {
            printOneTarea(newTarea, sectionPendientes)
            //reseteo del formulario
            event.target.reset()
        } else {
            alert(guardado)
            event.target.reset()
        }
    } else {
        alert('Pero tendrás que decirme la tarea y seleccionar una prioridad para que pueda guardarlo, Mari')
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

function getTarea(event) {
    let palabraBuscar = event.target.value;
    let listaFiltrada = filterByWord(tareas, palabraBuscar);
    printTareas(listaFiltrada, sectionPendientes);
}

inputTitulo.addEventListener('input', getTarea);