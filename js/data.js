const tareas = [
    /*  {
         titulo: 'Estudiar Javascript',
         prioridad: 'urgente'
     },
     {
         titulo: 'dormir',
         prioridad: 'diaria'
     },
     {
         titulo: 'salir a comer',
         prioridad: 'mensual'
     }, */
]


//FUNCIONES

//filterTareasByPriority - recibe dos parámetros: pLista de tareas (array) y pPrioridad (string). devuelve array.
//no necesito toLowerCase, porque en ambos casos el paramentro se elige por selector. el usuario no tiene que escribir nada

function filterTareasByPriority(pList, pPrioridad) {

    const filteredList = []
    for (let tarea of pList) {
        if (tarea.prioridad.includes(pPrioridad)) {
            filteredList[filteredList.length] = tarea;
        }
    }
    return filteredList;
}



//filtrar por palabras
//Recibe un array de tareas y una palabra (string) que buscará en .titulo

function filterByWord(pList, pWord) {
    return pList.filter(tarea => tarea.titulo.toLowerCase().includes(pWord.toLowerCase()))
}